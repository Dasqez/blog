const DEFAULT_ALLOWED_ORIGINS = [
  "https://minimalistycznie.pages.dev",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:8088",
  "http://127.0.0.1:8088",
];

async function ensureViewTables(env) {
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS post_views (
      post_slug TEXT NOT NULL,
      visitor_hash TEXT NOT NULL,
      first_viewed_at INTEGER NOT NULL,
      PRIMARY KEY (post_slug, visitor_hash)
    )`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS post_views_slug_idx ON post_views(post_slug)"),
  ]);
}

function response(data, status, corsHeaders, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "X-Content-Type-Options": "nosniff",
      ...corsHeaders,
      ...extraHeaders,
    },
  });
}

function normalizeSlug(value) {
  const slug = String(value || "").trim().slice(0, 300);
  return /^\/_posts\/[a-z0-9ąćęłńóśźż-]+\/$/i.test(slug) ? slug : "";
}

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  const configured = String(env.VIEW_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return configured.includes(origin);
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getPostViews(url, env, corsHeaders) {
  const slugs = [...new Set(url.searchParams.getAll("post").map(normalizeSlug).filter(Boolean))].slice(0, 100);
  if (!slugs.length) return response({ success: false, message: "Brak wpisów." }, 400, corsHeaders);

  await ensureViewTables(env);
  const placeholders = slugs.map(() => "?").join(",");
  const { results } = await env.DB.prepare(`SELECT post_slug AS postSlug, COUNT(*) AS views
    FROM post_views WHERE post_slug IN (${placeholders}) GROUP BY post_slug`).bind(...slugs).all();
  const views = Object.fromEntries(slugs.map((slug) => [slug, 0]));
  for (const row of results || []) views[row.postSlug] = Number(row.views || 0);

  return response({ success: true, views }, 200, corsHeaders, { "Cache-Control": "public, max-age=30" });
}

export async function recordPostView(request, env, corsHeaders) {
  if (!allowedOrigin(request, env)) return response({ success: false, message: "Niedozwolone źródło żądania." }, 403, corsHeaders);
  if (!(request.headers.get("Content-Type") || "").toLowerCase().includes("application/json")) {
    return response({ success: false, message: "Wymagany jest format JSON." }, 415, corsHeaders);
  }

  let payload;
  try { payload = await request.json(); } catch { return response({ success: false, message: "Nieprawidłowe dane." }, 400, corsHeaders); }
  const postSlug = normalizeSlug(payload?.postSlug);
  const visitorId = String(payload?.visitorId || "").trim();
  if (!postSlug || !/^[a-f0-9-]{16,64}$/i.test(visitorId)) {
    return response({ success: false, message: "Nieprawidłowe dane wyświetlenia." }, 400, corsHeaders);
  }

  await ensureViewTables(env);
  const secret = env.VIEW_HASH_SECRET || env.ADMIN_API_SECRET;
  if (!secret) return response({ success: false, message: "Licznik nie jest skonfigurowany." }, 503, corsHeaders);
  const visitorHash = await sha256(`${secret}:${postSlug}:${visitorId}`);
  await env.DB.prepare(`INSERT OR IGNORE INTO post_views (post_slug, visitor_hash, first_viewed_at)
    VALUES (?, ?, ?)`).bind(postSlug, visitorHash, Math.floor(Date.now() / 1000)).run();
  const count = await env.DB.prepare("SELECT COUNT(*) AS views FROM post_views WHERE post_slug = ?").bind(postSlug).first();

  return response({ success: true, views: Number(count?.views || 0) }, 200, corsHeaders, { "Cache-Control": "no-store" });
}
