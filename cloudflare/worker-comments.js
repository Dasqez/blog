import { authorizeAdminRequest } from "./worker-stage12-security.js";

async function ensureTables(env) {
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY, post_slug TEXT NOT NULL, author_name TEXT NOT NULL,
      body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', parent_id TEXT,
      is_author INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL, source_hash TEXT,
      FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
    )`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS comments_post_status_idx ON comments(post_slug, status, created_at)"),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS comment_rate_limits (
      source_hash TEXT NOT NULL, window_start INTEGER NOT NULL,
      request_count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (source_hash, window_start)
    )`),
  ]);
}

function response(data, status, corsHeaders, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json;charset=UTF-8", "X-Content-Type-Options": "nosniff", ...corsHeaders, ...extraHeaders },
  });
}

function postSlug(value) {
  const normalized = String(value || "").trim().slice(0, 300);
  return /^\/_posts\/[a-z0-9ąćęłńóśźż-]+\/$/i.test(normalized) ? normalized : "";
}

function clean(value, maxLength) {
  return String(value || "").replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function isJson(request) {
  return (request.headers.get("Content-Type") || "").toLowerCase().includes("application/json");
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  const configured = String(env.COMMENT_ALLOWED_ORIGINS || "https://minimalistycznie.pages.dev,http://localhost:8080,http://127.0.0.1:8080,http://localhost:8088,http://127.0.0.1:8088")
    .split(",").map((value) => value.trim()).filter(Boolean);
  return configured.includes(origin);
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sourceHash(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const agent = (request.headers.get("User-Agent") || "unknown").slice(0, 180);
  return sha256(`${env.COMMENT_HASH_SECRET || env.ADMIN_API_SECRET || "comments"}:${ip}:${agent}`);
}

async function rateLimit(request, env) {
  const hash = await sourceHash(request, env);
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % 600);
  await env.DB.prepare(`INSERT INTO comment_rate_limits (source_hash, window_start, request_count)
    VALUES (?, ?, 1) ON CONFLICT(source_hash, window_start)
    DO UPDATE SET request_count = request_count + 1`).bind(hash, windowStart).run();
  const row = await env.DB.prepare("SELECT request_count FROM comment_rate_limits WHERE source_hash = ? AND window_start = ?")
    .bind(hash, windowStart).first();
  return { allowed: Number(row?.request_count || 0) <= 3, hash, retryAfter: windowStart + 600 - now };
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: request.headers.get("CF-Connecting-IP") || undefined }),
  });
  const result = await verification.json().catch(() => null);
  return result?.success === true;
}

export async function getPublicComments(url, env, corsHeaders) {
  const post = postSlug(url.searchParams.get("post"));
  if (!post) return response({ success: false, message: "Nieprawidłowy adres wpisu." }, 400, corsHeaders);
  await ensureTables(env);
  const { results } = await env.DB.prepare(`SELECT id, author_name AS authorName, body,
    parent_id AS parentId, is_author AS isAuthor, created_at AS createdAt
    FROM comments WHERE post_slug = ? AND status = 'approved' ORDER BY created_at ASC`).bind(post).all();
  return response({ success: true, comments: results || [] }, 200, corsHeaders, { "Cache-Control": "public, max-age=30" });
}

export async function createPublicComment(request, env, corsHeaders) {
  if (!isAllowedOrigin(request, env)) return response({ success: false, message: "Niedozwolone źródło żądania." }, 403, corsHeaders);
  if (!isJson(request)) return response({ success: false, message: "Wymagany jest format JSON." }, 415, corsHeaders);
  await ensureTables(env);
  let payload;
  try { payload = await request.json(); } catch { return response({ success: false, message: "Nieprawidłowe dane." }, 400, corsHeaders); }
  if (payload?.website) return response({ success: true, pending: true }, 202, corsHeaders);
  const post = postSlug(payload?.postSlug);
  const authorName = clean(payload?.authorName, 60);
  const body = clean(payload?.body, 2000);
  if (!post || authorName.length < 2 || body.length < 3) return response({ success: false, message: "Podaj nick i treść komentarza." }, 400, corsHeaders);
  if (Number(payload?.startedAt) && Date.now() - Number(payload.startedAt) < 2500) return response({ success: false, message: "Formularz wysłano zbyt szybko." }, 400, corsHeaders);
  if ((body.match(/https?:\/\//gi) || []).length > 1) return response({ success: false, message: "Komentarz zawiera zbyt wiele linków." }, 400, corsHeaders);
  const limit = await rateLimit(request, env);
  if (!limit.allowed) return response({ success: false, message: "Dodajesz komentarze zbyt często. Spróbuj później." }, 429, corsHeaders, { "Retry-After": String(limit.retryAfter) });
  if (!(await verifyTurnstile(payload?.turnstileToken, request, env))) return response({ success: false, message: "Nie udało się potwierdzić, że nie jesteś botem." }, 400, corsHeaders);
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(`INSERT INTO comments (id, post_slug, author_name, body, status, created_at, updated_at, source_hash)
    VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)`).bind(crypto.randomUUID(), post, authorName, body, now, now, limit.hash).run();
  await env.DB.prepare("DELETE FROM comment_rate_limits WHERE window_start < ?").bind(now - 86400).run();
  return response({ success: true, pending: true, message: "Komentarz czeka na zatwierdzenie." }, 202, corsHeaders);
}

async function admin(request, env) {
  const hostname = new URL(request.url).hostname;
  if (hostname === "127.0.0.1" || hostname === "localhost") return true;
  return Boolean(await authorizeAdminRequest(request, env));
}

export async function getAdminComments(request, url, env, corsHeaders) {
  if (!(await admin(request, env))) return response({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  await ensureTables(env);
  const status = ["pending", "approved", "hidden", "spam"].includes(url.searchParams.get("status")) ? url.searchParams.get("status") : "all";
  const sql = `SELECT id, post_slug AS postSlug, author_name AS authorName, body, status,
    parent_id AS parentId, is_author AS isAuthor, created_at AS createdAt, updated_at AS updatedAt
    FROM comments ${status === "all" ? "" : "WHERE status = ?"} ORDER BY created_at DESC LIMIT 500`;
  const { results } = await (status === "all" ? env.DB.prepare(sql) : env.DB.prepare(sql).bind(status)).all();
  const counts = await env.DB.prepare("SELECT status, COUNT(*) AS count FROM comments GROUP BY status").all();
  return response({ success: true, comments: results || [], counts: counts.results || [] }, 200, corsHeaders);
}

export async function moderateAdminComment(request, env, corsHeaders) {
  if (!(await admin(request, env))) return response({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  if (!isJson(request)) return response({ success: false, message: "Wymagany jest format JSON." }, 415, corsHeaders);
  await ensureTables(env);
  const payload = await request.json();
  const status = ["approved", "hidden", "spam", "pending"].includes(payload?.status) ? payload.status : "";
  if (!payload?.id || !status) return response({ success: false, message: "Nieprawidłowa operacja." }, 400, corsHeaders);
  await env.DB.prepare("UPDATE comments SET status = ?, updated_at = ? WHERE id = ?").bind(status, Math.floor(Date.now() / 1000), payload.id).run();
  return response({ success: true }, 200, corsHeaders);
}

export async function replyToAdminComment(request, env, corsHeaders) {
  if (!(await admin(request, env))) return response({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  if (!isJson(request)) return response({ success: false, message: "Wymagany jest format JSON." }, 415, corsHeaders);
  await ensureTables(env);
  const payload = await request.json();
  const body = clean(payload?.body, 2000);
  const parent = await env.DB.prepare("SELECT id, post_slug AS postSlug FROM comments WHERE id = ? LIMIT 1").bind(payload?.parentId || "").first();
  if (!parent || body.length < 2) return response({ success: false, message: "Nieprawidłowa odpowiedź." }, 400, corsHeaders);
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(`INSERT INTO comments (id, post_slug, author_name, body, status, parent_id, is_author, created_at, updated_at)
    VALUES (?, ?, 'Dawid', ?, 'approved', ?, 1, ?, ?)`).bind(crypto.randomUUID(), parent.postSlug, body, parent.id, now, now).run();
  return response({ success: true }, 201, corsHeaders);
}

export async function deleteAdminComment(request, env, corsHeaders) {
  if (!(await admin(request, env))) return response({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  if (!isJson(request)) return response({ success: false, message: "Wymagany jest format JSON." }, 415, corsHeaders);
  await ensureTables(env);
  const payload = await request.json();
  if (!payload?.id) return response({ success: false, message: "Brak komentarza." }, 400, corsHeaders);
  await env.DB.prepare("DELETE FROM comments WHERE id = ? OR parent_id = ?").bind(payload.id, payload.id).run();
  return response({ success: true }, 200, corsHeaders);
}
