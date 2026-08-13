"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("comments");
  if (!section) return;

  const localPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const apiUrl = localPreview ? "http://127.0.0.1:8790" : section.dataset.commentsApi?.replace(/\/$/, "");
  const postSlug = section.dataset.postSlug;
  const form = document.getElementById("commentForm");
  const authorInput = document.getElementById("commentAuthor");
  const bodyInput = document.getElementById("commentBody");
  const list = document.getElementById("commentsList");
  const count = document.getElementById("commentsCount");
  const status = document.getElementById("commentFormStatus");
  const submit = form.querySelector("button[type='submit']");
  const startedAt = Date.now();
  const turnstileContainer = document.getElementById("commentTurnstile");
  let turnstileWidgetId = null;
  const rememberedName = localStorage.getItem("mpz-comment-author") || "";
  if (rememberedName) authorInput.value = rememberedName;

  function renderTurnstileWhenReady(attempt = 0) {
    if (!turnstileContainer) return;
    if (window.turnstile?.render) {
      const sitekey = localPreview ? "1x00000000000000000000AA" : turnstileContainer.dataset.sitekey;
      turnstileWidgetId = window.turnstile.render(turnstileContainer, { sitekey, theme: "auto" });
      return;
    }
    if (attempt < 50) window.setTimeout(() => renderTurnstileWhenReady(attempt + 1), 100);
  }

  renderTurnstileWhenReady();

  function formatDate(timestamp) {
    return new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(Number(timestamp) * 1000));
  }

  function friendlyConnectionError(error, fallback) {
    if (localPreview && (error instanceof TypeError || /fetch|network/i.test(String(error?.message || "")))) {
      return "Lokalny Worker komentarzy nie odpowiada. Uruchom go na porcie 8790 i odśwież stronę.";
    }
    return error instanceof Error ? error.message : fallback;
  }

  function createComment(comment, replies) {
    const article = document.createElement("article");
    article.className = `comment-item${comment.parentId ? " is-reply" : ""}`;
    const meta = document.createElement("div");
    meta.className = "comment-meta";
    const avatar = document.createElement("span");
    avatar.className = "comment-avatar";
    avatar.textContent = (comment.authorName || "?").charAt(0).toUpperCase();
    const author = document.createElement("strong");
    author.className = "comment-author";
    author.textContent = comment.authorName;
    meta.append(avatar, author);
    if (Number(comment.isAuthor)) {
      const badge = document.createElement("span");
      badge.className = "comment-author-badge";
      badge.textContent = "Autor";
      meta.append(badge);
    }
    const date = document.createElement("time");
    date.className = "comment-date";
    date.textContent = formatDate(comment.createdAt);
    meta.append(date);
    const body = document.createElement("p");
    body.className = "comment-body";
    body.textContent = comment.body;
    article.append(meta, body);
    (replies || []).forEach((reply) => article.append(createComment(reply, [])));
    return article;
  }

  async function loadComments() {
    try {
      const response = await fetch(`${apiUrl}/comments?post=${encodeURIComponent(postSlug)}`);
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Nie udało się pobrać komentarzy.");
      const comments = result.comments || [];
      const roots = comments.filter((comment) => !comment.parentId);
      list.replaceChildren();
      count.textContent = comments.length ? `${comments.length} ${comments.length === 1 ? "komentarz" : "komentarzy"}` : "";
      if (!roots.length) {
        const empty = document.createElement("p"); empty.className = "comments-empty"; empty.textContent = "Bądź pierwszą osobą, która skomentuje ten wpis."; list.append(empty); return;
      }
      roots.forEach((comment) => list.append(createComment(comment, comments.filter((reply) => reply.parentId === comment.id))));
    } catch (error) {
      list.replaceChildren();
      const message = document.createElement("p");
      message.className = "comments-empty";
      message.textContent = friendlyConnectionError(error, "Nie udało się pobrać komentarzy.");
      list.append(message);
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submit.disabled = true;
    status.textContent = "Wysyłanie…";
    try {
      const data = new FormData(form);
      const turnstileToken = data.get("cf-turnstile-response") || "";
      const response = await fetch(`${apiUrl}/comments`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug, authorName: authorInput.value, body: bodyInput.value, website: data.get("website"), startedAt, turnstileToken }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Nie udało się dodać komentarza.");
      localStorage.setItem("mpz-comment-author", authorInput.value.trim());
      bodyInput.value = "";
      status.textContent = result.message || "Komentarz czeka na zatwierdzenie.";
      if (window.turnstile && turnstileWidgetId != null) window.turnstile.reset(turnstileWidgetId);
    } catch (error) {
      status.textContent = friendlyConnectionError(error, "Nie udało się dodać komentarza.");
    } finally { submit.disabled = false; }
  });

  loadComments();
});
