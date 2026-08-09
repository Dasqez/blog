/* Etap 9 — eksport bazy D1 i subskrybentów. */

function escapeBackupCsv(value) {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

async function getAdminBackup(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) {
    return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  }

  const type = new URL(request.url).searchParams.get("type");
  try {
    if (type === "repository") {
      const repositoryResponse = await fetch("https://codeload.github.com/Dasqez/blog/zip/refs/heads/main", {
        headers: { "User-Agent": "MPZ-Backup-Worker" },
      });
      if (!repositoryResponse.ok) throw new Error(`GitHub zwrócił błąd HTTP ${repositoryResponse.status}.`);
      return new Response(repositoryResponse.body, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename="repository-${new Date().toISOString().slice(0, 10)}.zip"`,
          "Cache-Control": "no-store",
        },
      });
    }

    if (type === "subscribers") {
      const result = await env.DB.prepare(`
        SELECT id, email, status, created_at, confirmed_at
        FROM subscribers
        ORDER BY created_at DESC
      `).all();
      const columns = ["id", "email", "status", "created_at", "confirmed_at"];
      const lines = [columns.map(escapeBackupCsv).join(",")];
      (result.results || []).forEach((row) => lines.push(columns.map((column) => escapeBackupCsv(row[column])).join(",")));
      return new Response(`\uFEFF${lines.join("\r\n")}`, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
          "Cache-Control": "no-store",
        },
      });
    }

    if (type === "database") {
      const tableResult = await env.DB.prepare(`
        SELECT name FROM sqlite_master
        WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%'
        ORDER BY name
      `).all();
      const database = {};
      for (const table of tableResult.results || []) {
        const name = String(table.name || "");
        if (!/^[a-zA-Z0-9_]+$/.test(name)) continue;
        const rows = await env.DB.prepare(`SELECT * FROM "${name}"`).all();
        database[name] = rows.results || [];
      }
      return jsonResponse({
        success: true,
        format: "d1-json-backup-v1",
        exportedAt: new Date().toISOString(),
        database,
      }, 200, { ...corsHeaders, "Cache-Control": "no-store" });
    }

    return jsonResponse({ success: false, message: "Nieznany typ eksportu." }, 400, corsHeaders);
  } catch (error) {
    console.error("Błąd eksportu backupu:", error);
    return jsonResponse({ success: false, message: error instanceof Error ? error.message : "Nie udało się przygotować backupu." }, 500, corsHeaders);
  }
}

/* Trasa do dodania w fetch():
if (request.method === "GET" && url.pathname === "/admin/backup") {
  return getAdminBackup(request, env, corsHeaders);
}
*/
