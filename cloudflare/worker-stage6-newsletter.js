/* Etap 6 — funkcje i trasy do włączenia do Workera newsletter. */

async function getAdminNewsletters(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) {
    return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  }

  try {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS newsletter_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id TEXT NOT NULL,
      post_title TEXT NOT NULL,
      post_url TEXT NOT NULL,
      email TEXT NOT NULL,
      sent_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`).run();
    const historyResult = await env.DB.prepare(`
      SELECT post_id AS postId, post_title AS postTitle, post_url AS postUrl,
             recipients_count AS recipientsCount, sent_at AS sentAt
      FROM sent_newsletters
      ORDER BY sent_at DESC
      LIMIT 50
    `).all();

    const queueResult = await env.DB.prepare(`
      SELECT post_id AS postId,
             SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
             SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failed,
             SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) AS sent,
             MAX(sent_at) AS updatedAt
      FROM newsletter_deliveries
      GROUP BY post_id
      HAVING SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) > 0
          OR SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) > 0
      ORDER BY updatedAt DESC
      LIMIT 50
    `).all();

    const testsResult = await env.DB.prepare(`
      SELECT post_id AS postId, post_title AS postTitle, post_url AS postUrl,
             email AS testEmail, sent_at AS sentAt
      FROM newsletter_tests
      ORDER BY sent_at DESC
      LIMIT 50
    `).all();

    const history = [
      ...(historyResult.results || []).map((item) => ({ ...item, isTest: false })),
      ...(testsResult.results || []).map((item) => ({ ...item, isTest: true, recipientsCount: 1 })),
    ].sort((left, right) => String(right.sentAt || "").localeCompare(String(left.sentAt || ""))).slice(0, 50);
    const titles = new Map(history.map((item) => [item.postId, item.postTitle]));
    const queue = (queueResult.results || []).map((item) => ({
      ...item,
      postTitle: titles.get(item.postId) || item.postId,
    }));

    return jsonResponse({ success: true, history, queue }, 200, corsHeaders);
  } catch (error) {
    console.error("Błąd pobierania newsletterów:", error);
    return jsonResponse({ success: false, message: "Nie udało się pobrać kolejki i historii newsletterów." }, 500, corsHeaders);
  }
}

async function testAdminNewsletter(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) {
    return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  }
  if (!isJsonRequest(request)) {
    return jsonResponse({ success: false, message: "Nieprawidłowy format danych." }, 400, corsHeaders);
  }

  try {
    const body = await request.json();
    const email = normalizeEmail(body.email);
    const postId = normalizeText(body.postId);
    const postTitle = normalizeText(body.postTitle);
    const postUrl = normalizeText(body.postUrl);
    const postExcerpt = normalizeText(body.postExcerpt);
    const postImage = normalizeText(body.postImage) || "https://minimalistycznie.pages.dev/favicon.png";
    let validPostUrl = false;
    try { validPostUrl = ["http:", "https:"].includes(new URL(postUrl).protocol); } catch { validPostUrl = false; }

    if (!isValidEmail(email) || !postId || !postTitle || !postExcerpt || !validPostUrl) {
      return jsonResponse({ success: false, message: "Uzupełnij wpis, tytuł, opis i prawidłowy adres e-mail." }, 400, corsHeaders);
    }

    const mailResult = await sendAppsScriptRequest(env, {
      action: "newsletter",
      email,
      postId,
      postTitle,
      postUrl,
      postExcerpt,
      postImage,
      unsubscribeUrl: `${new URL(request.url).origin}/unsubscribe?token=test-${encodeURIComponent(postId)}`,
    });

    if (!mailResult.success) {
      throw new Error(normalizeText(mailResult.message) || "Bramka pocztowa odrzuciła wiadomość testową.");
    }

    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS newsletter_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id TEXT NOT NULL,
      post_title TEXT NOT NULL,
      post_url TEXT NOT NULL,
      email TEXT NOT NULL,
      sent_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`).run();

    await env.DB.prepare(`
      INSERT INTO newsletter_tests (post_id, post_title, post_url, email)
      VALUES (?, ?, ?, ?)
    `).bind(postId, postTitle, postUrl, email).run();

    return jsonResponse({ success: true, message: `Wysłano test na ${email}.` }, 200, corsHeaders);
  } catch (error) {
    console.error("Błąd testowej wysyłki newslettera:", error);
    return jsonResponse({ success: false, message: error instanceof Error ? error.message : "Nie udało się wysłać testu." }, 500, corsHeaders);
  }
}

async function sendAdminNewsletter(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) {
    return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  }
  if (!isJsonRequest(request)) {
    return jsonResponse({ success: false, message: "Nieprawidłowy format danych." }, 400, corsHeaders);
  }

  try {
    const body = await request.json();
    const postId = normalizeText(body.postId);
    const postTitle = normalizeText(body.postTitle);
    const postUrl = normalizeText(body.postUrl);
    if (!postId || !postTitle || !postUrl) {
      return jsonResponse({ success: false, message: "Brakuje identyfikatora, tytułu lub adresu wpisu." }, 400, corsHeaders);
    }

    if (body.resend === true) {
      await env.DB.batch([
        env.DB.prepare("DELETE FROM sent_newsletters WHERE post_id = ?").bind(postId),
        env.DB.prepare("DELETE FROM newsletter_deliveries WHERE post_id = ?").bind(postId),
      ]);
    }

    const internalRequest = new Request(request.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.NEWSLETTER_TRIGGER_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        postTitle,
        postUrl,
        postExcerpt: normalizeText(body.postExcerpt),
        postImage: normalizeText(body.postImage),
      }),
    });

    return sendNewsletter(internalRequest, env, corsHeaders, new URL(request.url));
  } catch (error) {
    console.error("Błąd wysyłki newslettera z CMS:", error);
    return jsonResponse({ success: false, message: error instanceof Error ? error.message : "Nie udało się wysłać newslettera." }, 500, corsHeaders);
  }
}

/* Trasy do dodania w fetch():
if (request.method === "GET" && pathname === "/admin/newsletters") return getAdminNewsletters(request, env, corsHeaders);
if (request.method === "POST" && pathname === "/admin/newsletter/test") return testAdminNewsletter(request, env, corsHeaders);
if (request.method === "POST" && pathname === "/admin/newsletter/send") return sendAdminNewsletter(request, env, corsHeaders);
*/
