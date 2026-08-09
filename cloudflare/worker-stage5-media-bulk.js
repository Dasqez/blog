/* Etap 5 — zbiorcze usuwanie mediów jednym commitem GitHuba. */

async function deleteMediaBulk(request, env, corsHeaders) {
  try {
    if (!isAuthorizedAdmin(request, env)) return jsonResponse({ success: false, message: "Brak dostępu." }, 401, corsHeaders);
    if (!isJsonRequest(request)) return jsonResponse({ success: false, message: "Nieprawidłowy format danych." }, 400, corsHeaders);
    if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) return jsonResponse({ success: false, message: "Brakuje konfiguracji GitHuba w Workerze." }, 500, corsHeaders);

    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"];
    const validItems = items.filter((item) => {
      const path = normalizeText(item?.path);
      return path.startsWith("assets/images/") && !path.includes("..") && allowedExtensions.some((extension) => path.toLowerCase().endsWith(extension));
    });

    if (!validItems.length || validItems.length !== items.length || validItems.length > 100) {
      return jsonResponse({ success: false, message: "Lista obrazów jest nieprawidłowa lub przekracza limit 100 plików." }, 400, corsHeaders);
    }

    const uniquePaths = [...new Set(validItems.map((item) => normalizeText(item.path)))];
    if (uniquePaths.length !== validItems.length) return jsonResponse({ success: false, message: "Lista zawiera powtórzone ścieżki." }, 400, corsHeaders);

    const [owner, repository] = env.GITHUB_REPO.split("/");
    if (!owner || !repository) return jsonResponse({ success: false, message: "Zmienna GITHUB_REPO ma nieprawidłowy format." }, 500, corsHeaders);
    const headers = { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", "User-Agent": "MPZ-Admin-Panel", "X-GitHub-Api-Version": "2022-11-28" };
    const apiBase = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;

    const repositoryResponse = await fetch(apiBase, { headers });
    const repositoryData = await repositoryResponse.json();
    if (!repositoryResponse.ok) throw new Error(repositoryData.message || "Nie udało się odczytać repozytorium.");
    const branch = repositoryData.default_branch || "main";

    const referenceResponse = await fetch(`${apiBase}/git/ref/heads/${encodeURIComponent(branch)}`, { headers });
    const referenceData = await referenceResponse.json();
    if (!referenceResponse.ok) throw new Error(referenceData.message || "Nie udało się odczytać gałęzi GitHuba.");
    const parentSha = referenceData.object?.sha;

    const parentResponse = await fetch(`${apiBase}/git/commits/${encodeURIComponent(parentSha)}`, { headers });
    const parentData = await parentResponse.json();
    if (!parentResponse.ok || !parentData.tree?.sha) throw new Error(parentData.message || "Nie udało się odczytać drzewa repozytorium.");

    const treeResponse = await fetch(`${apiBase}/git/trees`, {
      method: "POST", headers,
      body: JSON.stringify({ base_tree: parentData.tree.sha, tree: uniquePaths.map((path) => ({ path, mode: "100644", type: "blob", sha: null })) }),
    });
    const treeData = await treeResponse.json();
    if (!treeResponse.ok) throw new Error(treeData.message || "Nie udało się przygotować zbiorczej zmiany.");

    const commitResponse = await fetch(`${apiBase}/git/commits`, {
      method: "POST", headers,
      body: JSON.stringify({ message: `Usunięcie ${uniquePaths.length} obrazów z biblioteki`, tree: treeData.sha, parents: [parentSha] }),
    });
    const commitData = await commitResponse.json();
    if (!commitResponse.ok) throw new Error(commitData.message || "Nie udało się utworzyć commita.");

    const updateResponse = await fetch(`${apiBase}/git/refs/heads/${encodeURIComponent(branch)}`, {
      method: "PATCH", headers, body: JSON.stringify({ sha: commitData.sha, force: false }),
    });
    const updateData = await updateResponse.json();
    if (!updateResponse.ok) throw new Error(updateData.message || "Repozytorium zmieniło się w trakcie operacji. Spróbuj ponownie.");

    return jsonResponse({ success: true, message: `Usunięto ${uniquePaths.length} obrazów.`, deletedPaths: uniquePaths, commitSha: commitData.sha }, 200, corsHeaders);
  } catch (error) {
    console.error("Błąd zbiorczego usuwania mediów:", error);
    return jsonResponse({ success: false, message: error instanceof Error ? error.message : "Nie udało się usunąć obrazów." }, 500, corsHeaders);
  }
}
