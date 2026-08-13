"use strict";

const VIEW_VISITOR_KEY = "blog-view-visitor-id";

function getViewVisitorId() {
  try {
    let visitorId = localStorage.getItem(VIEW_VISITOR_KEY);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(VIEW_VISITOR_KEY, visitorId);
    }
    return visitorId;
  } catch {
    return "";
  }
}

function renderViewCount(elements, count) {
  const formatted = new Intl.NumberFormat("pl-PL").format(Math.max(0, Number(count) || 0));
  elements.forEach((element) => {
    element.textContent = `${formatted} wyświetleń`;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const counters = [...document.querySelectorAll("[data-view-count][data-view-slug][data-view-api]")];
  if (!counters.length) return;

  const localPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const apiUrl = localPreview ? "http://127.0.0.1:8790" : counters[0].dataset.viewApi.replace(/\/$/, "");
  const slugs = [...new Set(counters.map((counter) => counter.dataset.viewSlug).filter(Boolean))];
  const trackedCounter = counters.find((counter) => counter.hasAttribute("data-view-track"));

  try {
    if (trackedCounter) {
      const visitorId = getViewVisitorId();
      if (!visitorId) throw new Error("Brak lokalnego identyfikatora przeglądarki.");
      const response = await fetch(`${apiUrl}/views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug: trackedCounter.dataset.viewSlug, visitorId }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.message || "Nie udało się zapisać wyświetlenia.");
      renderViewCount(counters.filter((counter) => counter.dataset.viewSlug === trackedCounter.dataset.viewSlug), result.views);
      return;
    }

    const query = new URLSearchParams();
    slugs.forEach((slug) => query.append("post", slug));
    const response = await fetch(`${apiUrl}/views?${query}`);
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error(result.message || "Nie udało się pobrać wyświetleń.");
    counters.forEach((counter) => renderViewCount([counter], result.views[counter.dataset.viewSlug]));
  } catch (error) {
    console.warn("Licznik wyświetleń jest chwilowo niedostępny.", error);
    counters.forEach((counter) => { counter.textContent = "— wyświetleń"; });
  }
});
