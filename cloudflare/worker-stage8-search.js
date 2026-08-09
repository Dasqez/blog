/* Etap 8 — dane subskrybentów dla globalnej wyszukiwarki CMS. */

async function getAdminSubscribers(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) {
    return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  }

  try {
    const schema = await env.DB.prepare("PRAGMA table_info(subscribers)").all();
    const availableColumns = new Set((schema.results || []).map((column) => String(column.name || "")));
    const optionalColumn = (candidates, alias) => {
      const column = candidates.find((candidate) => availableColumns.has(candidate));
      return column ? `"${column}" AS "${alias}"` : `NULL AS "${alias}"`;
    };
    const createdColumn = availableColumns.has("created_at") ? "created_at" : null;
    const selectedColumns = [
      optionalColumn(["id"], "id"),
      optionalColumn(["email"], "email"),
      optionalColumn(["status"], "status"),
      optionalColumn(["created_at", "createdAt"], "createdAt"),
      optionalColumn(["unsubscribed_at", "inactive_at", "unsubscribedAt"], "unsubscribedAt"),
      optionalColumn(["name", "full_name", "fullName"], "fullName"),
      optionalColumn(["first_name", "firstName"], "firstName"),
      optionalColumn(["last_name", "lastName"], "lastName"),
    ];
    const order = createdColumn ? `"${createdColumn}" DESC` : "rowid DESC";
    const result = await env.DB.prepare(`
      SELECT ${selectedColumns.join(", ")}
      FROM subscribers
      ORDER BY ${order}
      LIMIT 2000
    `).all();

    return jsonResponse({ success: true, subscribers: result.results || [] }, 200, corsHeaders);
  } catch (error) {
    console.error("Błąd pobierania subskrybentów do wyszukiwarki:", error);
    return jsonResponse({ success: false, message: "Nie udało się pobrać subskrybentów." }, 500, corsHeaders);
  }
}

async function deleteAdminSubscriber(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) {
    return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  }
  if (!isJsonRequest(request)) {
    return jsonResponse({ success: false, message: "Nieprawidłowy format danych." }, 415, corsHeaders);
  }

  try {
    const body = await request.json();
    const email = normalizeText(body?.email).trim().toLowerCase();
    const id = normalizeText(body?.id).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return jsonResponse({ success: false, message: "Nieprawidłowy adres e-mail." }, 400, corsHeaders);
    }

    const statement = id
      ? env.DB.prepare("DELETE FROM subscribers WHERE id = ? AND lower(email) = ?").bind(id, email)
      : env.DB.prepare("DELETE FROM subscribers WHERE lower(email) = ?").bind(email);
    const result = await statement.run();
    if (Number(result.meta?.changes || 0) === 0) {
      return jsonResponse({ success: false, message: "Nie znaleziono subskrybenta." }, 404, corsHeaders);
    }
    return jsonResponse({ success: true, deletedEmail: email }, 200, corsHeaders);
  } catch (error) {
    console.error("Błąd usuwania subskrybenta:", error);
    return jsonResponse({ success: false, message: "Nie udało się usunąć subskrybenta." }, 500, corsHeaders);
  }
}

/* Trasa do dodania w fetch():
if (request.method === "GET" && url.pathname === "/admin/subscribers") {
  return getAdminSubscribers(request, env, corsHeaders);
}
if (request.method === "POST" && url.pathname === "/admin/subscriber/delete") {
  return deleteAdminSubscriber(request, env, corsHeaders);
}
*/
