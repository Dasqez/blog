/* Etap 4 — funkcje do włączenia do Workera newsletter. */

async function requirePageAdmin(request, env, corsHeaders) {
  if (!isAuthorizedAdmin(request, env)) return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
  if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) return jsonResponse({ success: false, message: "Brakuje konfiguracji GitHuba w Workerze." }, 500, corsHeaders);
  return null;
}

function getPageRepository(env) {
  const parts = String(env.GITHUB_REPO || "").split("/");
  return parts.length === 2 ? { owner: parts[0], repository: parts[1] } : null;
}

function normalizePageSlug(value) {
  return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-");
}

async function writeGitHubFile(env, path, content, message, sha) {
  const repo = getPageRepository(env);
  if (!repo) return { success: false, status: 500, message: "Zmienna GITHUB_REPO ma nieprawidłowy format." };
  const payload = { message, content: encodeUtf8ToBase64(content) };
  if (sha) payload.sha = sha;
  const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/${encodePath(path)}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", "User-Agent": "MPZ-Admin-Panel", "X-GitHub-Api-Version": "2022-11-28" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  return response.ok ? { success: true, status: response.status, data } : { success: false, status: response.status, message: data.message || `GitHub zwrócił błąd HTTP ${response.status}.` };
}

async function deleteGitHubFile(env, path, sha, message) {
  const repo = getPageRepository(env);
  const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/${encodePath(path)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", "User-Agent": "MPZ-Admin-Panel", "X-GitHub-Api-Version": "2022-11-28" },
    body: JSON.stringify({ message, sha }),
  });
  const data = await response.json().catch(() => ({}));
  return response.ok ? { success: true, data } : { success: false, status: response.status, message: data.message || "Nie udało się usunąć pliku." };
}

async function listPagePaths(env) {
  const repo = getPageRepository(env);
  const result = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/${encodePath("_includes/pages")}`);
  if (!result.success || !Array.isArray(result.data)) return [];
  return result.data.filter(item => item.type === "file" && /\.(liquid|html|md)$/i.test(item.name || "")).map(item => item.path);
}

async function syncPublicPages(env, paths) {
  const repo = getPageRepository(env);
  const indexResponse = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/index.html`);
  if (!indexResponse.success) return indexResponse;

  const uniquePaths = [...new Set(paths.filter(isValidPagePath))];
  const homeIndex = uniquePaths.findIndex(path => /\/home\.(liquid|html|md)$/i.test(path));
  if (homeIndex > 0) uniquePaths.unshift(uniquePaths.splice(homeIndex, 1)[0]);

  const pages = uniquePaths.map(path => {
    const name = path.split("/").pop();
    const slug = name.replace(/\.(liquid|html|md)$/i, "");
    return { path, slug, title: getPageDisplayTitle(slug) };
  });
  const navigation = pages.map(page => `                <li><a href="#${page.slug}" data-page="${page.slug}" id="nav-${page.slug}"${page.slug === "home" ? ' class="active"' : ""}>${escapeHtml(page.title)}</a></li>`).join("\n");
  const sections = pages.map(page => `<div id="page-${page.slug}" class="page-section${page.slug === "home" ? " active-section" : ""}">\n    {% include "pages/${page.path.split("/").pop()}" %}\n</div>`).join("\n\n");

  let source = decodeGitHubContent(indexResponse.data);
  source = source.replace(/<nav>[\s\S]*?<\/nav>/, `<nav>\n            <!-- CMS_NAV_START -->\n            <ul>\n${navigation}\n            </ul>\n            <!-- CMS_NAV_END -->\n        </nav>`);
  const markedPages = `<!-- CMS_PAGES_START -->\n${sections}\n<!-- CMS_PAGES_END -->`;
  if (/<!-- CMS_PAGES_START -->[\s\S]*?<!-- CMS_PAGES_END -->/.test(source)) {
    source = source.replace(/<!-- CMS_PAGES_START -->[\s\S]*?<!-- CMS_PAGES_END -->/, markedPages);
  } else {
    source = source.replace(/<div id="page-home"[\s\S]*?<div id="page-newsletter"[\s\S]*?<\/div>/, markedPages);
  }
  if (pages.some(page => !source.includes(`id="page-${page.slug}" class="page-section${page.slug === "home" ? " active-section" : ""}"`))) {
    return { success: false, status: 500, message: "Wygenerowany układ stron nie przeszedł walidacji." };
  }
  let writeResult = await writeGitHubFile(env, "index.html", source, "Synchronizacja stron publicznych", indexResponse.data.sha);
  if (!writeResult.success && (writeResult.status === 409 || writeResult.status === 422)) {
    const freshIndex = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/index.html`);
    if (freshIndex.success) {
      writeResult = await writeGitHubFile(env, "index.html", source, "Synchronizacja stron publicznych", freshIndex.data.sha);
    }
  }
  return writeResult;
}

async function createAdminPage(request, env, corsHeaders) {
  const denied = await requirePageAdmin(request, env, corsHeaders); if (denied) return denied;
  if (!isJsonRequest(request)) return jsonResponse({ success: false, message: "Nieprawidłowy format danych." }, 400, corsHeaders);
  const body = await request.json();
  const slug = normalizePageSlug(body.slug || body.title);
  if (!slug) return jsonResponse({ success: false, message: "Podaj prawidłowy tytuł i slug strony." }, 400, corsHeaders);
  const path = `_includes/pages/${slug}.liquid`;
  const result = await writeGitHubFile(env, path, String(body.body || "").replace(/\r\n/g, "\n"), `Utworzenie strony: ${slug}`);
  if (result.success) {
    const syncResult = await syncPublicPages(env, [...await listPagePaths(env), path]);
    if (!syncResult.success) return jsonResponse({ success: false, message: `Strona powstała, ale nie udało się dodać jej do serwisu: ${syncResult.message}` }, syncResult.status || 502, corsHeaders);
  }
  return jsonResponse(result.success ? { success: true, message: "Strona została utworzona.", page: { path, sha: result.data.content?.sha || null } } : { success: false, message: result.message }, result.success ? 201 : (result.status || 502), corsHeaders);
}

async function deleteAdminPage(request, env, corsHeaders) {
  const denied = await requirePageAdmin(request, env, corsHeaders); if (denied) return denied;
  const body = await request.json(); const path = normalizeText(body.path); const sha = normalizeText(body.sha);
  if (!isValidPagePath(path) || !sha) return jsonResponse({ success: false, message: "Nieprawidłowa strona lub brak SHA." }, 400, corsHeaders);
  const result = await deleteGitHubFile(env, path, sha, `Usunięcie strony: ${path.split("/").pop()}`);
  if (result.success) {
    const syncResult = await syncPublicPages(env, (await listPagePaths(env)).filter(item => item !== path));
    if (!syncResult.success) return jsonResponse({ success: false, message: `Plik usunięto, ale nie udało się zaktualizować serwisu: ${syncResult.message}` }, syncResult.status || 502, corsHeaders);
  }
  return jsonResponse(result.success ? { success: true } : { success: false, message: result.message }, result.success ? 200 : (result.status || 502), corsHeaders);
}

async function duplicateAdminPage(request, env, corsHeaders) {
  const denied = await requirePageAdmin(request, env, corsHeaders); if (denied) return denied;
  const body = await request.json(); const sourcePath = normalizeText(body.path); const slug = normalizePageSlug(body.slug);
  if (!isValidPagePath(sourcePath) || !slug) return jsonResponse({ success: false, message: "Nieprawidłowa strona lub slug kopii." }, 400, corsHeaders);
  const repo = getPageRepository(env); const source = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/${encodePath(sourcePath)}`);
  if (!source.success) return jsonResponse({ success: false, message: source.message }, source.status || 502, corsHeaders);
  const path = `_includes/pages/${slug}.liquid`;
  const result = await writeGitHubFile(env, path, decodeGitHubContent(source.data), `Duplikowanie strony: ${slug}`);
  if (result.success) {
    const syncResult = await syncPublicPages(env, [...await listPagePaths(env), path]);
    if (!syncResult.success) return jsonResponse({ success: false, message: `Kopia powstała, ale nie udało się dodać jej do serwisu: ${syncResult.message}` }, syncResult.status || 502, corsHeaders);
  }
  return jsonResponse(result.success ? { success: true, page: { path, sha: result.data.content?.sha || null } } : { success: false, message: result.message }, result.success ? 201 : (result.status || 502), corsHeaders);
}

async function reorderAdminPages(request, env, corsHeaders) {
  const denied = await requirePageAdmin(request, env, corsHeaders); if (denied) return denied;
  const body = await request.json(); const paths = Array.isArray(body.paths) ? body.paths.filter(isValidPagePath) : [];
  if (!paths.length || paths.length !== body.paths.length || new Set(paths).size !== paths.length) return jsonResponse({ success: false, message: "Nieprawidłowa kolejność stron." }, 400, corsHeaders);
  const orderPath = "_data/cms-page-order.json"; const repo = getPageRepository(env);
  const current = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/${encodePath(orderPath)}`);
  const result = await writeGitHubFile(env, orderPath, JSON.stringify({ paths }, null, 2) + "\n", "Aktualizacja kolejności stron", current.success ? current.data.sha : null);
  if (result.success) {
    const syncResult = await syncPublicPages(env, paths);
    if (!syncResult.success) return jsonResponse({ success: false, message: `Kolejność zapisano, ale nie udało się zaktualizować serwisu: ${syncResult.message}` }, syncResult.status || 502, corsHeaders);
  }
  return jsonResponse(result.success ? { success: true } : { success: false, message: result.message }, result.success ? 200 : (result.status || 502), corsHeaders);
}

async function getAdminPageHistory(request, env, corsHeaders) {
  const denied = await requirePageAdmin(request, env, corsHeaders); if (denied) return denied;
  const path = normalizeText(new URL(request.url).searchParams.get("path"));
  if (!isValidPagePath(path)) return jsonResponse({ success: false, message: "Ścieżka strony jest nieprawidłowa." }, 400, corsHeaders);
  const repo = getPageRepository(env);
  const result = await githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/commits?path=${encodeURIComponent(path)}&per_page=30`);
  if (!result.success) return jsonResponse({ success: false, message: result.message }, result.status || 502, corsHeaders);
  return jsonResponse({ success: true, versions: result.data.map(item => ({ sha: item.sha, message: item.commit?.message || "Wersja strony", date: item.commit?.author?.date || null, author: item.commit?.author?.name || item.author?.login || "GitHub", url: item.html_url || null })) }, 200, corsHeaders);
}

async function rollbackAdminPage(request, env, corsHeaders) {
  const denied = await requirePageAdmin(request, env, corsHeaders); if (denied) return denied;
  const body = await request.json(); const path = normalizeText(body.path); const commitSha = normalizeText(body.commitSha);
  if (!isValidPagePath(path) || !/^[a-f0-9]{7,40}$/i.test(commitSha)) return jsonResponse({ success: false, message: "Nieprawidłowa strona lub wersja." }, 400, corsHeaders);
  const repo = getPageRepository(env);
  const [historic, current] = await Promise.all([githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/${encodePath(path)}?ref=${encodeURIComponent(commitSha)}`), githubRequest(env, `/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.repository)}/contents/${encodePath(path)}`)]);
  if (!historic.success || !current.success) return jsonResponse({ success: false, message: historic.message || current.message || "Nie udało się pobrać wersji." }, historic.status || current.status || 502, corsHeaders);
  const result = await writeGitHubFile(env, path, decodeGitHubContent(historic.data), `Przywrócenie wersji strony: ${path.split("/").pop()}`, current.data.sha);
  return jsonResponse(result.success ? { success: true, page: { sha: result.data.content?.sha || null } } : { success: false, message: result.message }, result.success ? 200 : (result.status || 502), corsHeaders);
}
