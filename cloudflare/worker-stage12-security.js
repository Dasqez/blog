/*
 * Etap 12 — warstwa bezpieczeństwa Workera.
 *
 * Integracja z głównym Workerem:
 * 1. Na początku fetch() wywołaj handleAdminSecurityRoute().
 * 2. Dla tras /admin/* zastąp dotychczasową kontrolę ADMIN_API_SECRET przez
 *    `await authorizeAdminRequest(request, env)`.
 * 3. Przed operacjami POST/PUT/PATCH/DELETE wywołaj validateAdminJsonRequest().
 * 4. Błędy nieoczekiwane zwracaj przez secureWorkerError().
 *
 * Moduł nie zapisuje surowych tokenów ani klucza administratora w D1.
 */

const ADMIN_ACCESS_TTL_SECONDS = 15 * 60;
const ADMIN_REFRESH_TTL_SECONDS = 8 * 60 * 60;
const ADMIN_JSON_LIMIT_BYTES = 10 * 1024 * 1024;

export async function handleAdminSecurityRoute(request, env, corsHeaders = {}) {
  const url = new URL(request.url);
  if (request.method === "POST" && url.pathname === "/admin/session") {
    return createAdminSecuritySession(request, env, corsHeaders);
  }
  if (request.method === "POST" && url.pathname === "/admin/session/refresh") {
    return refreshAdminSecuritySession(request, env, corsHeaders);
  }
  if (request.method === "POST" && url.pathname === "/admin/session/logout") {
    return revokeAdminSecuritySession(request, env, corsHeaders);
  }
  return null;
}

export async function authorizeAdminRequest(request, env) {
  await ensureSecurityTables(env);
  const token = readBearerToken(request);
  if (!token) return null;

  const tokenHash = await sha256(token);
  const now = Math.floor(Date.now() / 1000);
  const session = await env.DB.prepare(`
    SELECT id, access_expires_at AS accessExpiresAt, refresh_expires_at AS refreshExpiresAt
    FROM admin_sessions
    WHERE access_token_hash = ? AND revoked_at IS NULL
    LIMIT 1
  `).bind(tokenHash).first();

  if (!session || Number(session.accessExpiresAt) <= now) return null;
  await env.DB.prepare("UPDATE admin_sessions SET last_used_at = ? WHERE id = ?")
    .bind(now, session.id).run();
  return session;
}

export async function enforceAdminRateLimit(request, env, bucket = "read") {
  await ensureSecurityTables(env);
  const limits = {
    login: { max: 5, window: 15 * 60 },
    refresh: { max: 20, window: 15 * 60 },
    ai: { max: 10, window: 60 * 60 },
    read: { max: 240, window: 60 },
    write: { max: 60, window: 60 },
  };
  const rule = limits[bucket] || limits.read;
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = await sha256(`${bucket}:${ip}`);
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % rule.window);

  await env.DB.prepare(`
    INSERT INTO admin_rate_limits (rate_key, window_start, request_count)
    VALUES (?, ?, 1)
    ON CONFLICT(rate_key, window_start)
    DO UPDATE SET request_count = request_count + 1
  `).bind(key, windowStart).run();

  const row = await env.DB.prepare(`
    SELECT request_count AS requestCount
    FROM admin_rate_limits WHERE rate_key = ? AND window_start = ?
  `).bind(key, windowStart).first();

  return {
    allowed: Number(row?.requestCount || 0) <= rule.max,
    retryAfter: windowStart + rule.window - now,
    limit: rule.max,
  };
}

export function validateAdminJsonRequest(request, maxBytes = ADMIN_JSON_LIMIT_BYTES) {
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { valid: false, status: 415, message: "Wymagany jest format application/json." };
  }
  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > maxBytes) {
    return { valid: false, status: 413, message: "Żądanie jest zbyt duże." };
  }
  return { valid: true };
}

export function secureWorkerError(error, corsHeaders = {}, context = {}) {
  const requestId = crypto.randomUUID();
  console.error("Worker admin error", {
    requestId,
    route: context.route || "unknown",
    method: context.method || "unknown",
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : "Unknown failure",
  });
  return securityJson({
    success: false,
    message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
    requestId,
  }, 500, corsHeaders);
}

async function createAdminSecuritySession(request, env, corsHeaders) {
  const rate = await enforceAdminRateLimit(request, env, "login");
  if (!rate.allowed) return rateLimitResponse(rate, corsHeaders);
  if (!constantTimeEqual(readBearerToken(request), env.ADMIN_API_SECRET || "")) {
    return securityJson({ success: false, message: "Nieprawidłowe dane logowania." }, 401, corsHeaders);
  }

  await ensureSecurityTables(env);
  const session = await issueSessionTokens();
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(`
    INSERT INTO admin_sessions
      (id, access_token_hash, refresh_token_hash, access_expires_at, refresh_expires_at, created_at, last_used_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(), await sha256(session.accessToken), await sha256(session.refreshToken),
    now + ADMIN_ACCESS_TTL_SECONDS, now + ADMIN_REFRESH_TTL_SECONDS, now, now
  ).run();
  await removeExpiredSecurityRows(env, now);

  return securityJson({ success: true, ...session, expiresIn: ADMIN_ACCESS_TTL_SECONDS }, 200, corsHeaders);
}

async function refreshAdminSecuritySession(request, env, corsHeaders) {
  const rate = await enforceAdminRateLimit(request, env, "refresh");
  if (!rate.allowed) return rateLimitResponse(rate, corsHeaders);
  const validation = validateAdminJsonRequest(request, 4096);
  if (!validation.valid) return securityJson({ success: false, message: validation.message }, validation.status, corsHeaders);

  let body;
  try { body = await request.json(); } catch {
    return securityJson({ success: false, message: "Nieprawidłowy JSON." }, 400, corsHeaders);
  }
  const refreshToken = typeof body?.refreshToken === "string" ? body.refreshToken : "";
  if (refreshToken.length < 32 || refreshToken.length > 256) {
    return securityJson({ success: false, message: "Nieprawidłowy token odświeżający." }, 400, corsHeaders);
  }

  const now = Math.floor(Date.now() / 1000);
  const row = await env.DB.prepare(`
    SELECT id FROM admin_sessions
    WHERE refresh_token_hash = ? AND refresh_expires_at > ? AND revoked_at IS NULL
    LIMIT 1
  `).bind(await sha256(refreshToken), now).first();
  if (!row) return securityJson({ success: false, message: "Sesja wygasła." }, 401, corsHeaders);

  const session = await issueSessionTokens();
  await env.DB.prepare(`
    UPDATE admin_sessions SET access_token_hash = ?, refresh_token_hash = ?,
      access_expires_at = ?, last_used_at = ? WHERE id = ?
  `).bind(await sha256(session.accessToken), await sha256(session.refreshToken), now + ADMIN_ACCESS_TTL_SECONDS, now, row.id).run();
  return securityJson({ success: true, ...session, expiresIn: ADMIN_ACCESS_TTL_SECONDS }, 200, corsHeaders);
}

async function revokeAdminSecuritySession(request, env, corsHeaders) {
  await ensureSecurityTables(env);
  const token = readBearerToken(request);
  if (token) {
    await env.DB.prepare("UPDATE admin_sessions SET revoked_at = ? WHERE access_token_hash = ?")
      .bind(Math.floor(Date.now() / 1000), await sha256(token)).run();
  }
  return securityJson({ success: true }, 200, corsHeaders);
}

async function ensureSecurityTables(env) {
  if (!env.DB) throw new Error("Brak powiązania D1 DB.");
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS admin_sessions (
      id TEXT PRIMARY KEY, access_token_hash TEXT NOT NULL UNIQUE,
      refresh_token_hash TEXT NOT NULL UNIQUE, access_expires_at INTEGER NOT NULL,
      refresh_expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL,
      last_used_at INTEGER NOT NULL, revoked_at INTEGER
    )`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS admin_rate_limits (
      rate_key TEXT NOT NULL, window_start INTEGER NOT NULL,
      request_count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (rate_key, window_start)
    )`),
  ]);
}

async function removeExpiredSecurityRows(env, now) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM admin_sessions WHERE refresh_expires_at < ? OR revoked_at < ?").bind(now, now - 86400),
    env.DB.prepare("DELETE FROM admin_rate_limits WHERE window_start < ?").bind(now - 86400),
  ]);
}

async function issueSessionTokens() {
  return { accessToken: randomToken(), refreshToken: randomToken() };
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function readBearerToken(request) {
  const match = (request.headers.get("Authorization") || "").match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

function constantTimeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index++) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function rateLimitResponse(rate, corsHeaders) {
  return new Response(JSON.stringify({ success: false, message: "Zbyt wiele żądań. Spróbuj ponownie później." }), {
    status: 429,
    headers: { "Content-Type": "application/json;charset=UTF-8", "Retry-After": String(rate.retryAfter), "X-RateLimit-Limit": String(rate.limit), ...corsHeaders },
  });
}

function securityJson(data, status, corsHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json;charset=UTF-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...corsHeaders },
  });
}
