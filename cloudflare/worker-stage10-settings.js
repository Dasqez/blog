/* Etap 10 — publiczne ustawienia bloga zapisywane w repozytorium. */

function getDefaultCmsSettings() {
  return {
    name: "Minimalistycznie Przez Życie", slogan: "Małe przygody w wielkim świecie",
    url: "https://minimalistycznie.pages.dev", favicon: "/favicon.png", logo: "", theme: "light",
    visibility: { name: true, slogan: true, favicon: true, logo: true, social: { facebook: true, instagram: true, x: true, github: true } },
    social: { facebook: "", instagram: "", x: "", github: "" }, googleAnalyticsId: "",
    giscus: { enabled: true, repo: "Dasqez/blog", repoId: "R_kgDOS4j9FQ", category: "General", categoryId: "DIC_kwDOS4j9Fc4C_GFg" },
    newsletter: { enabled: true },
  };
}

function normalizeCmsSettings(value) {
  const defaults = getDefaultCmsSettings();
  const input = value && typeof value === "object" ? value : {};
  const theme = ["light", "dark", "auto"].includes(input.theme) ? input.theme : "light";
  return {
    name: normalizeText(input.name).slice(0, 100) || defaults.name,
    slogan: normalizeText(input.slogan).slice(0, 180),
    url: normalizeText(input.url).replace(/\/$/, "") || defaults.url,
    favicon: normalizeText(input.favicon).slice(0, 500) || defaults.favicon,
    logo: normalizeText(input.logo).slice(0, 500), theme,
    visibility: {
      name: input.visibility?.name !== false, slogan: input.visibility?.slogan !== false,
      favicon: input.visibility?.favicon !== false, logo: input.visibility?.logo !== false,
      social: {
        facebook: input.visibility?.social?.facebook !== false, instagram: input.visibility?.social?.instagram !== false,
        x: input.visibility?.social?.x !== false, github: input.visibility?.social?.github !== false,
      },
    },
    social: {
      facebook: normalizeText(input.social?.facebook).slice(0, 500), instagram: normalizeText(input.social?.instagram).slice(0, 500),
      x: normalizeText(input.social?.x).slice(0, 500), github: normalizeText(input.social?.github).slice(0, 500),
    },
    googleAnalyticsId: normalizeText(input.googleAnalyticsId).slice(0, 40),
    giscus: {
      enabled: input.giscus?.enabled !== false, repo: normalizeText(input.giscus?.repo).slice(0, 200),
      repoId: normalizeText(input.giscus?.repoId).slice(0, 200), category: normalizeText(input.giscus?.category).slice(0, 200),
      categoryId: normalizeText(input.giscus?.categoryId).slice(0, 200),
    },
    newsletter: { enabled: input.newsletter?.enabled !== false },
  };
}

async function getAdminSettings(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  try {
    const repo = getPageRepository(env);
    if (!repo) throw new Error("Nieprawidłowa konfiguracja repozytorium.");
    const result = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/_data/site.json`);
    if (!result.success) return jsonResponse({ success: true, settings: getDefaultCmsSettings(), sha: null }, 200, corsHeaders);
    let parsed = {};
    try { parsed = JSON.parse(decodeGitHubContent(result.data)); } catch { parsed = {}; }
    return jsonResponse({ success: true, settings: normalizeCmsSettings(parsed), sha: result.data.sha || null }, 200, corsHeaders);
  } catch (error) {
    return jsonResponse({ success: false, message: error instanceof Error ? error.message : "Nie udało się pobrać ustawień." }, 500, corsHeaders);
  }
}

async function saveAdminSettings(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  if (!isJsonRequest(request)) return jsonResponse({ success: false, message: "Nieprawidłowy format danych." }, 400, corsHeaders);
  try {
    const body = await request.json();
    const settings = normalizeCmsSettings(body.settings);
    if (!/^https?:\/\//i.test(settings.url)) return jsonResponse({ success: false, message: "Adres bloga musi być pełnym adresem HTTP lub HTTPS." }, 400, corsHeaders);
    const repo = getPageRepository(env);
    const existing = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/_data/site.json`);
    const sha = existing.success ? existing.data.sha : null;
    const saved = await writeGitHubFile(env, "_data/site.json", `${JSON.stringify(settings, null, 2)}\n`, "Aktualizacja ustawień CMS", sha);
    if (!saved.success) return jsonResponse({ success: false, message: saved.message || "Nie udało się zapisać ustawień." }, saved.status || 500, corsHeaders);
    return jsonResponse({ success: true, message: "Ustawienia zostały zapisane.", settings, commitSha: saved.data?.commit?.sha || null }, 200, corsHeaders);
  } catch (error) {
    return jsonResponse({ success: false, message: error instanceof Error ? error.message : "Nie udało się zapisać ustawień." }, 500, corsHeaders);
  }
}

/* Trasy do dodania w fetch():
if (url.pathname === "/admin/settings" && request.method === "GET") return getAdminSettings(request, env, corsHeaders);
if (url.pathname === "/admin/settings" && request.method === "POST") return saveAdminSettings(request, env, corsHeaders);
*/
