/* Etap 8 — dane subskrybentów dla globalnej wyszukiwarki CMS. */

async function getAdminSubscribers(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) {
    return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  }

  try {
    const result = await env.DB.prepare(`
      SELECT id, email, status, created_at AS createdAt
      FROM subscribers
      ORDER BY created_at DESC
      LIMIT 500
    `).all();

    return jsonResponse({ success: true, subscribers: result.results || [] }, 200, corsHeaders);
  } catch (error) {
    console.error("Błąd pobierania subskrybentów do wyszukiwarki:", error);
    return jsonResponse({ success: false, message: "Nie udało się pobrać subskrybentów." }, 500, corsHeaders);
  }
}

/* Trasa do dodania w fetch():
if (request.method === "GET" && url.pathname === "/admin/subscribers") {
  return getAdminSubscribers(request, env, corsHeaders);
}
*/
