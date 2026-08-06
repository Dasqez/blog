const ADMIN_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/summary";

const ADMIN_POSTS_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/posts";

const ADMIN_POST_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/post";

const ADMIN_UPDATE_POST_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/post/update";

const ADMIN_CREATE_POST_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/post/create";

const ADMIN_DELETE_POST_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/post/delete";

const ADMIN_UPLOAD_IMAGE_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/upload-image";

const ADMIN_MEDIA_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/media";

const ADMIN_DELETE_MEDIA_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/media/delete";

/* =========================================================
   ELEMENTY INTERFEJSU
   ========================================================= */

const loginScreen = document.getElementById("loginScreen");
const adminApp = document.getElementById("adminApp");
const loginForm = document.getElementById("loginForm");
const secretInput = document.getElementById("adminSecret");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const mediaGrid =
  document.getElementById("mediaGrid");

const mediaSearchInput =
  document.getElementById("mediaSearchInput");

const mediaUploadButton =
  document.getElementById("mediaUploadButton");

const mediaChooseButton =
  document.getElementById("mediaChooseButton");

const mediaDropzone =
  document.getElementById("mediaDropzone");

const mediaFileInput =
  document.getElementById("mediaFileInput");
const logoutButton = document.getElementById("logoutButton");
const refreshButton = document.getElementById("refreshButton");
const connectionStatus =
  document.getElementById("connectionStatus");
const lastUpdated = document.getElementById("lastUpdated");
const globalMessage = document.getElementById("globalMessage");
const viewTitle = document.getElementById("viewTitle");
const editorOverlay =
  document.getElementById(
    "editorOverlay"
  );
const postsList = document.getElementById("postsList");
const postsSearchInput = document.getElementById("postsSearchInput");
const previewTitle = document.getElementById("previewTitle");
const previewDate = document.getElementById("previewDate");
const previewExcerpt = document.getElementById("previewExcerpt");
const openPostButton = document.getElementById("openPostButton");
const editPostButton = document.getElementById("editPostButton");
const deletePostButton =
  document.getElementById("deletePostButton");
const reloadPostsButton =
  document.getElementById("reloadPostsButton");
const newPostButton = document.getElementById("newPostButton");
const closeEditorButton =
  document.getElementById("closeEditorButton");

const editorPanel = document.getElementById("editorPanel");
const editorTitle = document.getElementById("editorTitle");
const editorSlug = document.getElementById("editorSlug");
const editorDate = document.getElementById("editorDate");
const editorLayout = document.getElementById("editorLayout");
const editorBody = document.getElementById("editorBody");
const markdownPreview =
  document.getElementById("markdownPreview");

const editorStatistics =
  document.getElementById("editorStatistics");
const markdownToolbarButtons =
  document.querySelectorAll("[data-markdown-action]");
const savePostButton =
  document.getElementById("savePostButton");
const uploadImageButton =
  document.getElementById("uploadImageButton");
const imageUploadInput =
  document.getElementById("imageUploadInput");
const cancelEditButton =
  document.getElementById("cancelEditButton");

const sidebar = document.getElementById("sidebar");
const sidebarOverlay =
  document.getElementById("sidebarOverlay");
const menuButton = document.getElementById("menuButton");
const mobileCloseButton =
  document.getElementById("mobileCloseButton");

const navItems = document.querySelectorAll(".nav-item");
const panelViews = document.querySelectorAll(".panel-view");
const openViewButtons = document.querySelectorAll(
  "[data-open-view]"
);

const mediaSidebar =
  document.getElementById(
    "mediaSidebar"
  );

const mediaPreviewImage =
  document.getElementById(
    "mediaPreviewImage"
  );

const mediaName =
  document.getElementById(
    "mediaName"
  );

const mediaUrl =
  document.getElementById(
    "mediaUrl"
  );

const mediaSize =
  document.getElementById(
    "mediaSize"
  );

const closeMediaSidebar =
  document.getElementById(
    "closeMediaSidebar"
  );

const insertMediaButton =
  document.getElementById(
    "insertMediaButton"
  );

const deleteMediaButton =
  document.getElementById(
    "deleteMediaButton"
  );

const copyMediaName =
  document.getElementById("copyMediaName");

const copyMediaUrl =
  document.getElementById("copyMediaUrl");

const downloadMediaButton =
  document.getElementById(
    "downloadMediaButton"
  );

/* =========================================================
   STAN APLIKACJI
   ========================================================= */

let adminSecret =
  sessionStorage.getItem("mpzPanelAdminSecret") || "";

let posts = [];
let selectedPost = null;
let editedPost = null;
let postsLoaded = false;
let slugEditedManually = false;
let isCreatingNewPost = false;
let activeSearchResultIndex = -1;
let selectedPreviewImageWrapper = null;
let selectedPreviewImage = null;
let previewResizeSession = null;

let mediaItems = [];
let mediaLoaded = false;
let selectedMedia = null;
let selectedMediaCard = null;
let mediaTypeFilter = "all";
let mediaSortOrder = "newest";
let editorSuspendedForMedia = false;

/* =========================================================
   LISTENERY
   ========================================================= */

deleteMediaButton?.addEventListener(
  "click",
  deleteSelectedMedia
);

insertMediaButton?.addEventListener("click", () => {

  if (!selectedMedia) return;

  if (!hasActiveEditorSession()) {
    showMessage(
      globalMessage,
      "Najpierw otwórz lub utwórz wpis, do którego chcesz wstawić obraz.",
      "error"
    );
    return;
  }

  const imageUrl =
    getMediaUrl(selectedMedia);

  insertImageMarkdown(
    imageUrl,
    selectedMedia.name.replace(/\.[^.]+$/, "")
  );

  closeMediaPanel();
  restoreEditorAfterMedia();

});

downloadMediaButton?.addEventListener(
  "click",
  () => {

    if (!selectedMedia)
      return;

    const a =
      document.createElement("a");

    a.href =
      getMediaUrl(selectedMedia, true);

    a.download =
      selectedMedia.name;

    document.body.appendChild(a);

    a.click();

    a.remove();

  }
);

copyMediaName?.addEventListener("click", () => {

  copyToClipboard(
    mediaName.value,
    copyMediaName
  );

});

copyMediaUrl?.addEventListener("click", () => {

  copyToClipboard(
    mediaUrl.value,
    copyMediaUrl
  );

});

closeMediaSidebar?.addEventListener(
  "click",
  closeMediaPanel
);

mediaSearchInput?.addEventListener(
  "input",
  renderMedia
);

mediaUploadButton?.addEventListener("click", () => {
  mediaFileInput.click();
});

mediaChooseButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  mediaFileInput.click();
});

mediaDropzone?.addEventListener("click", (event) => {
  if (event.target !== mediaChooseButton) {
    mediaFileInput.click();
  }
});

["dragenter", "dragover"].forEach((eventName) => {
  mediaDropzone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    mediaDropzone.classList.add("is-dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  mediaDropzone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    mediaDropzone.classList.remove("is-dragging");
  });
});

mediaDropzone?.addEventListener("drop", async (event) => {
  await uploadMediaFiles(event.dataTransfer?.files);
});

mediaFileInput?.addEventListener("change", async () => {
  await uploadMediaFiles(mediaFileInput.files);
  mediaFileInput.value = "";
});


markdownPreview?.addEventListener(
  "click",
  handlePreviewImageClick
);

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const secret = secretInput.value.trim();

  if (!secret) {
    showMessage(
      loginMessage,
      "Wpisz klucz administratora.",
      "error"
    );

    return;
  }

  adminSecret = secret;
  setLoginLoading(true);

  const success = await loadDashboardData();

  setLoginLoading(false);

  if (!success) {
    return;
  }

  sessionStorage.setItem(
    "mpzPanelAdminSecret",
    adminSecret
  );

  loginScreen.hidden = true;
  adminApp.hidden = false;
  secretInput.value = "";

  openView("dashboard");
});

logoutButton.addEventListener("click", logout);

refreshButton.addEventListener("click", async () => {
  await loadDashboardData();
});

reloadPostsButton.addEventListener("click", async () => {
  await loadPosts(true);
});

newPostButton.addEventListener("click", () => {
  createNewPost();
});

editPostButton.addEventListener("click", async () => {
  if (!selectedPost) {
    return;
  }

  await openPostEditor(selectedPost);
});

deletePostButton.addEventListener("click", async () => {
  if (!selectedPost) {
    return;
  }

  const confirmed = window.confirm(
    `Czy na pewno chcesz usunąć wpis:\n\n${selectedPost.title}?`
  );

  if (!confirmed) {
    return;
  }

  deletePostButton.disabled = true;
  deletePostButton.textContent = "Usuwanie...";

  try {
    const response = await fetch(
      ADMIN_DELETE_POST_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminSecret}`,
        },
        body: JSON.stringify({
          path: selectedPost.path,
          sha: selectedPost.sha,
          title: selectedPost.title,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.message || "Nie udało się usunąć wpisu."
      );
    }

    selectedPost = null;
    editedPost = null;
    postsLoaded = false;

    closePostEditor();
    resetPostPreview();

    await loadPosts(true);

    showMessage(
      globalMessage,
      "Wpis został usunięty. Cloudflare opublikuje nową wersję strony.",
      "success"
    );
  } catch (error) {
    showMessage(
      globalMessage,
      error instanceof Error
        ? error.message
        : "Nie udało się usunąć wpisu.",
      "error"
    );
  } finally {
    deletePostButton.disabled = selectedPost === null;
    deletePostButton.textContent = "Usuń";
  }
});

cancelEditButton.addEventListener("click", () => {
  closePostEditor();
});

savePostButton.addEventListener("click", async () => {

  if (isCreatingNewPost) {

    savePostButton.disabled = true;
    savePostButton.textContent = "Tworzenie...";

    try {

      const response = await fetch(
        ADMIN_CREATE_POST_API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminSecret}`,
          },
          body: JSON.stringify({
            title: editorTitle.value.trim(),
            slug: editorSlug.value.trim(),
            date: editorDateToJekyll(editorDate.value),
            layout: editorLayout.value.trim(),
            body: editorBody.value,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Nie udało się utworzyć wpisu."
        );
      }

      postsLoaded = false;

      await loadPosts(true);

      closePostEditor();

      showMessage(
        globalMessage,
        "Nowy wpis został utworzony.",
        "success"
      );

    } catch (error) {

      showMessage(
        globalMessage,
        error instanceof Error
          ? error.message
          : "Nie udało się utworzyć wpisu.",
        "error"
      );

    } finally {

      savePostButton.disabled = false;
      savePostButton.textContent = "Zapisz";

    }

    return;
  }

  if (!editedPost) {
    return;
  }

  const title = editorTitle.value.trim();
  const date = editorDate.value.trim();
  const layout = editorLayout.value.trim();

  if (!title) {
    showMessage(
      globalMessage,
      "Wpisz tytuł wpisu.",
      "error"
    );

    editorTitle.focus();
    return;
  }

  if (!date) {
    showMessage(
      globalMessage,
      "Wpisz datę wpisu.",
      "error"
    );

    editorDate.focus();
    return;
  }

  if (!layout) {
    showMessage(
      globalMessage,
      "Wpisz nazwę layoutu.",
      "error"
    );

    editorLayout.focus();
    return;
  }

  let jekyllDate;

  try {
    jekyllDate = editorDateToJekyll(date);
  } catch (error) {
    showMessage(
      globalMessage,
      error instanceof Error
        ? error.message
        : "Data ma nieprawidłowy format.",
      "error"
    );

    editorDate.focus();
    return;
  }

  savePostButton.disabled = true;
  savePostButton.textContent = "Zapisywanie...";

  try {
    const response = await fetch(
      ADMIN_UPDATE_POST_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminSecret}`,
        },
        body: JSON.stringify({
          path: editedPost.path,
          sha: editedPost.sha,
          title,
          date: jekyllDate,
          layout,
          body: editorBody.value,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.message ||
        "Nie udało się zapisać wpisu."
      );
    }

    if (result.post?.sha) {
      editedPost.sha = result.post.sha;

      if (selectedPost) {
        selectedPost.sha = result.post.sha;
      }
    }

    postsLoaded = false;

    await loadPosts(true);

    closePostEditor();

    showMessage(
      globalMessage,
      "Wpis został zapisany. Cloudflare rozpocznie publikację nowej wersji.",
      "success"
    );
  } catch (error) {
    showMessage(
      globalMessage,
      error instanceof Error
        ? error.message
        : "Nie udało się zapisać wpisu.",
      "error"
    );
  } finally {
    savePostButton.disabled = false;
    savePostButton.textContent = "Zapisz";
  }
});

editorTitle.addEventListener("input", () => {
  if (!slugEditedManually) {
    editorSlug.value = createSlug(editorTitle.value);
  }

  renderMarkdownPreview();
});

editorSlug.addEventListener("input", () => {
  slugEditedManually = true;
  editorSlug.value = createSlug(editorSlug.value);
});

editorBody.addEventListener("input", () => {
  renderMarkdownPreview();
});

editorBody.addEventListener("keydown", (event) => {

  if (event.key !== "Tab") {
    return;
  }

  event.preventDefault();

  const start = editorBody.selectionStart;
  const end = editorBody.selectionEnd;

  editorBody.setRangeText(
    "  ",
    start,
    end,
    "end"
  );

  editorBody.dispatchEvent(
    new Event("input")
  );
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    openView(item.dataset.view);
    closeMobileMenu();
  });
});

openViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openView(button.dataset.openView);
  });
});

menuButton.addEventListener("click", openMobileMenu);
mobileCloseButton.addEventListener(
  "click",
  closeMobileMenu
);
sidebarOverlay.addEventListener(
  "click",
  closeMobileMenu
);

markdownToolbarButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyMarkdownAction(button.dataset.markdownAction);
  });
});

document.addEventListener(
  "keydown",
  handleEditorShortcuts,
  true
);

postsSearchInput.addEventListener(
  "input",
  filterPosts
);

postsSearchInput.addEventListener(
  "keydown",
  handlePostsSearchKeyboard
);

uploadImageButton.addEventListener(
  "click",
  () => {
    imageUploadInput.click();
  }
);

imageUploadInput.addEventListener(
  "change",
  async () => {
    const file = imageUploadInput.files?.[0];

    if (!file) {
      return;
    }

    uploadImageButton.disabled = true;

    try {
      const result = await uploadImageFile(file);

      const altText =
        file.name.replace(/\.[^.]+$/, "");

      insertImageMarkdown(
        result.url,
        altText
      );

      mediaLoaded = false;

      showMessage(
        globalMessage,
        "Obraz został dodany do GitHuba i wstawiony do treści.",
        "success"
      );
    } catch (error) {
      showMessage(
        globalMessage,
        error instanceof Error
          ? error.message
          : "Nie udało się wysłać obrazu.",
        "error"
      );
    } finally {
      uploadImageButton.disabled = false;
      imageUploadInput.value = "";
    }
  }
);

function insertImageMarkdown(url, altText = "Obraz") {
  if (!url) {
    return;
  }

  const start = editorBody.selectionStart;
  const end = editorBody.selectionEnd;

  const safeAltText = String(altText || "Obraz")
    .replace(/[\[\]]/g, "")
    .trim();

  const markdown =
    `![${safeAltText}](${url})`;

  const currentValue = editorBody.value;

  const before =
    start > 0 &&
      currentValue[start - 1] !== "\n"
      ? "\n\n"
      : "";

  const after =
    end < currentValue.length &&
      currentValue[end] !== "\n"
      ? "\n\n"
      : "\n";

  const insertedText =
    `${before}${markdown}${after}`;

  editorBody.setRangeText(
    insertedText,
    start,
    end,
    "end"
  );

  editorBody.focus();

  editorBody.dispatchEvent(
    new Event("input", {
      bubbles: true,
    })
  );
}

closeEditorButton.addEventListener(
  "click",
  closePostEditor
);

document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    !editorPanel.hidden
  ) {
    closePostEditor();
  }

});


editorOverlay.addEventListener(
  "click",
  closePostEditor
);

/* =========================================================
   START APLIKACJI
   ========================================================= */

if (adminSecret) {
  restoreSession();
}

/* =========================================================
   LOGOWANIE I DASHBOARD
   ========================================================= */

async function restoreSession() {
  setConnectionState("loading");

  const success = await loadDashboardData();

  if (!success) {
    sessionStorage.removeItem("mpzPanelAdminSecret");
    adminSecret = "";
    return;
  }

  loginScreen.hidden = true;
  adminApp.hidden = false;

  openView("dashboard");
}

async function loadDashboardData() {
  setConnectionState("loading");
  showMessage(globalMessage, "Pobieram dane...");

  try {
    const response = await fetch(ADMIN_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminSecret}`,
      },
    });

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.message ||
        "Nie udało się pobrać danych."
      );
    }

    renderData(result);

    setConnectionState("connected");
    showMessage(globalMessage, "");
    showMessage(loginMessage, "");

    lastUpdated.textContent =
      `Ostatnia aktualizacja: ${formatDate(
        new Date().toISOString()
      )}`;

    return true;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Wystąpił nieznany błąd.";

    setConnectionState("error");
    showMessage(loginMessage, message, "error");
    showMessage(globalMessage, message, "error");

    return false;
  }
}

function renderData(data) {
  const subscribers = data.subscribers;
  const newsletters = data.newsletters;
  const deliveries = data.deliveries;

  setText("totalSubscribers", subscribers.total);
  setText("activeSubscribers", subscribers.active);
  setText("pendingSubscribers", subscribers.pending);
  setText("totalNewsletters", newsletters.total);

  setText("sentDeliveries", deliveries.sent);
  setText("failedDeliveries", deliveries.failed);
  setText("pendingDeliveries", deliveries.pending);

  setText(
    "latestSubscription",
    formatDate(subscribers.latestSubscription)
  );

  setText(
    "latestNewsletter",
    formatDate(newsletters.latestNewsletter)
  );

  setText(
    "newsletterTotalSubscribers",
    subscribers.total
  );

  setText(
    "newsletterActiveSubscribers",
    subscribers.active
  );

  setText(
    "newsletterSentDeliveries",
    deliveries.sent
  );

  setText(
    "newsletterFailedDeliveries",
    deliveries.failed
  );
}

/* =========================================================
   WIDOKI PANELU
   ========================================================= */

function openView(viewName) {

  if (!editorPanel.hidden) {
    if (viewName === "media") {
      suspendEditorForMedia();
    } else {
      closePostEditor();
    }
  }

  if (editorPanel.hidden && editorSuspendedForMedia && viewName !== "media") {
    if (viewName === "posts") {
      editorOverlay.hidden = false;
      editorPanel.hidden = false;
      editorSuspendedForMedia = false;
    } else {
      closePostEditor();
    }
  }

  const targetView = document.getElementById(
    `view-${viewName}`
  );

  if (!targetView) {
    return;
  }

  panelViews.forEach((view) => {
    view.classList.remove("active-view");
  });

  navItems.forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.view === viewName
    );
  });

  targetView.classList.add("active-view");

  viewTitle.textContent =
    targetView.dataset.title || "Panel";

  if (viewName === "posts" && !postsLoaded) {
    loadPosts();
  }

  if (viewName === "media" && !mediaLoaded) {
    loadMedia();
  }

  window.location.hash = viewName;
}

/* =========================================================
   LISTA WPISÓW
   ========================================================= */

async function loadPosts(forceRefresh = false) {
  if (postsLoaded && !forceRefresh) {
    return;
  }

  postsList.innerHTML = "<p>Ładowanie wpisów...</p>";
  reloadPostsButton.disabled = true;

  try {
    const response = await fetch(
      ADMIN_POSTS_API_URL,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminSecret}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.message ||
        "Nie udało się pobrać wpisów."
      );
    }

    posts = Array.isArray(result.posts)
      ? result.posts
      : [];

    postsLoaded = true;

    if (selectedPost) {
      const refreshedPost = posts.find(
        (post) => post.path === selectedPost.path
      );

      if (refreshedPost) {
        selectedPost = refreshedPost;
      }
    }

    renderPosts();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Wystąpił nieznany błąd.";

    postsList.innerHTML = "";

    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.className =
      "global-message error";

    postsList.appendChild(errorMessage);
  } finally {
    reloadPostsButton.disabled = false;
  }
}

function renderPosts() {
  postsList.innerHTML = "";

  if (posts.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.textContent =
      "Nie znaleziono żadnych wpisów.";

    postsList.appendChild(emptyMessage);
    return;
  }

  posts.forEach((post) => {
    const item = document.createElement("button");

    item.type = "button";
    item.className = "post-item";

    const title = document.createElement("span");
    title.className = "post-title";
    title.textContent = post.title || post.name;

    const date = document.createElement("span");
    date.className = "post-date";
    date.textContent = formatDate(post.date);

    item.append(title, date);

    item.addEventListener("click", () => {
      selectPost(post, item);
    });

    postsList.appendChild(item);

    if (
      selectedPost &&
      selectedPost.path === post.path
    ) {
      selectPost(post, item);
    }
  });
}

function filterPosts() {
  activeSearchResultIndex = -1;

  const search =
    postsSearchInput.value
      .trim()
      .toLowerCase();

  document
    .querySelectorAll(".post-item")
    .forEach((item) => {

      const text =
        item.textContent.toLowerCase();

      item.style.display =
        text.includes(search)
          ? ""
          : "none";

    });

}

function selectPost(post, item) {
  selectedPost = post;

  document
    .querySelectorAll(".post-item")
    .forEach((element) => {
      element.classList.remove("active");
    });

  item.classList.add("active");

  previewTitle.textContent =
    post.title || post.name;

  previewDate.textContent =
    formatDate(post.date);

  previewExcerpt.textContent =
    post.excerpt ||
    "Ten wpis nie ma krótkiego opisu.";

  if (post.url) {
    openPostButton.href = post.url;
    openPostButton.hidden = false;
  } else {
    openPostButton.hidden = true;
    openPostButton.removeAttribute("href");
  }

  editPostButton.disabled = false;
  deletePostButton.disabled = false;
}

function resetPostPreview() {
  previewTitle.textContent = "Wybierz wpis";
  previewDate.textContent = "";
  previewExcerpt.textContent =
    "Po kliknięciu wpisu zobaczysz tutaj jego opis.";

  openPostButton.hidden = true;
  openPostButton.removeAttribute("href");

  editPostButton.disabled = true;
  deletePostButton.disabled = true;
}

/* =========================================================
   EDYTOR ISTNIEJĄCEGO WPISU
   ========================================================= */

async function openPostEditor(post) {
  savePostButton.disabled = true;
  savePostButton.textContent = "Pobieranie...";

  try {
    const response = await fetch(
      `${ADMIN_POST_API_URL}?path=${encodeURIComponent(
        post.path
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminSecret}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(
        result.message ||
        "Nie udało się pobrać wpisu."
      );
    }

    editedPost = result.post;
    isCreatingNewPost = false;
    slugEditedManually = true;

    editorTitle.value =
      result.post.title || "";

    editorSlug.value =
      getSlugFromPostName(result.post.name);

    editorDate.value =
      formatEditorDate(result.post.date);

    editorLayout.value =
      result.post.layout || "post-layout.html";

    editorBody.value =
      result.post.body || "";

    renderMarkdownPreview();

    editorOverlay.hidden = false;
    editorPanel.hidden = false;
    editorSuspendedForMedia = false;
    savePostButton.disabled = false;
    editorTitle.focus();

    showMessage(globalMessage, "");
  } catch (error) {
    showMessage(
      globalMessage,
      error instanceof Error
        ? error.message
        : "Nie udało się pobrać wpisu.",
      "error"
    );
  } finally {
    savePostButton.textContent = "Zapisz";
  }
}

/* =========================================================
   NOWY WPIS
   ========================================================= */

function createNewPost() {
  selectedPost = null;
  editedPost = null;

  isCreatingNewPost = true;
  slugEditedManually = false;

  editorTitle.value = "";
  editorSlug.value = "";
  editorDate.value =
    formatEditorDate(new Date());
  editorLayout.value = "post-layout.html";
  editorBody.value = "";
  renderMarkdownPreview();

  editorOverlay.hidden = false;
  editorPanel.hidden = false;
  editorSuspendedForMedia = false;
  savePostButton.disabled = false;
  savePostButton.textContent = "Utwórz wpis";

  document
    .querySelectorAll(".post-item")
    .forEach((element) => {
      element.classList.remove("active");
    });

  previewTitle.textContent = "Nowy wpis";
  previewDate.textContent = "";
  previewExcerpt.textContent =
    "Wypełnij formularz, aby utworzyć nowy wpis.";

  openPostButton.hidden = true;
  editPostButton.disabled = true;
  deletePostButton.disabled = true;

  showMessage(globalMessage, "");

  editorTitle.focus();
}

function closePostEditor() {
  editorOverlay.hidden = true;
  editorPanel.hidden = true;
  editorSuspendedForMedia = false;

  editedPost = null;
  isCreatingNewPost = false;
  slugEditedManually = false;

  editorTitle.value = "";
  editorSlug.value = "";
  editorDate.value = "";
  editorLayout.value = "";
  editorBody.value = "";
  renderMarkdownPreview();

  savePostButton.disabled = true;
  savePostButton.textContent = "Zapisz";
}

function hasActiveEditorSession() {
  return isCreatingNewPost || Boolean(editedPost) || editorSuspendedForMedia;
}

function suspendEditorForMedia() {
  editorSuspendedForMedia = hasActiveEditorSession();
  editorOverlay.hidden = true;
  editorPanel.hidden = true;
}

function restoreEditorAfterMedia() {
  if (!hasActiveEditorSession()) {
    return;
  }

  openView("posts");
  editorOverlay.hidden = false;
  editorPanel.hidden = false;
  editorSuspendedForMedia = false;
  renderMarkdownPreview();
  editorBody.focus();
}

/* =========================================================
   SLUG
   ========================================================= */

function createSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getSlugFromPostName(fileName) {
  return String(fileName || "")
    .replace(/\.md$/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

/* =========================================================
   DATY
   ========================================================= */

function formatDate(value) {
  if (!value) {
    return "Brak danych";
  }

  const normalizedValue =
    String(value).includes("T")
      ? String(value)
      : `${String(value).replace(" ", "T")}Z`;

  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }).format(date);
}

function formatEditorDate(value) {
  if (!value) {
    return "";
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getDate()).padStart(
    2,
    "0"
  );

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const year = date.getFullYear();

  const hours = String(
    date.getHours()
  ).padStart(2, "0");

  const minutes = String(
    date.getMinutes()
  ).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function editorDateToJekyll(value) {
  const match = String(value || "")
    .trim()
    .match(
      /^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})$/
    );

  if (!match) {
    throw new Error(
      "Data musi mieć format DD.MM.RRRR GG:MM."
    );
  }

  const [, day, month, year, hour, minute] =
    match;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    0,
    0
  );

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day) ||
    date.getHours() !== Number(hour) ||
    date.getMinutes() !== Number(minute)
  ) {
    throw new Error(
      "Podana data nie istnieje."
    );
  }

  const timezoneOffset =
    -date.getTimezoneOffset();

  const sign =
    timezoneOffset >= 0 ? "+" : "-";

  const offsetHours = String(
    Math.floor(
      Math.abs(timezoneOffset) / 60
    )
  ).padStart(2, "0");

  const offsetMinutes = String(
    Math.abs(timezoneOffset) % 60
  ).padStart(2, "0");

  return (
    `${year}-${month}-${day}` +
    `T${hour}:${minute}:00.000` +
    `${sign}${offsetHours}:${offsetMinutes}`
  );
}

/* =========================================================
   MENU I WYLOGOWANIE
   ========================================================= */

function logout() {
  adminSecret = "";

  sessionStorage.removeItem(
    "mpzPanelAdminSecret"
  );

  adminApp.hidden = true;
  loginScreen.hidden = false;

  secretInput.value = "";
  secretInput.focus();

  posts = [];
  selectedPost = null;
  editedPost = null;
  postsLoaded = false;
  isCreatingNewPost = false;

  closePostEditor();
  setConnectionState("loading");

  showMessage(
    loginMessage,
    "Wylogowano z panelu.",
    "success"
  );
}

function openMobileMenu() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("visible");
}

function closeMobileMenu() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("visible");
}

function handleEditorShortcuts(event) {
  const ctrl =
    event.ctrlKey || event.metaKey;

  /*
   * Ctrl + F działa w całym panelu,
   * również wtedy, gdy edytor jest zamknięty.
   */
  if (
    ctrl &&
    event.key.toLowerCase() === "f"
  ) {
    event.preventDefault();
    event.stopPropagation();

    openView("posts");

    requestAnimationFrame(() => {
      postsSearchInput.focus();
      postsSearchInput.select();
    });

    return;
  }

  /*
   * Pozostałe skróty działają tylko
   * przy otwartym edytorze.
   */
  if (editorPanel.hidden) {
    return;
  }

  if (!ctrl) {
    return;
  }

  switch (true) {
    case event.key.toLowerCase() === "b":
      event.preventDefault();
      applyMarkdownAction("bold");
      return;

    case event.key.toLowerCase() === "i":
      event.preventDefault();
      applyMarkdownAction("italic");
      return;

    case event.key.toLowerCase() === "k":
      event.preventDefault();
      applyMarkdownAction("link");
      return;

    case event.key.toLowerCase() === "s":
      event.preventDefault();

      if (!savePostButton.disabled) {
        savePostButton.click();
      }

      return;

    case event.shiftKey && event.key === "7":
      event.preventDefault();
      applyMarkdownAction("ordered-list");
      return;

    case event.shiftKey && event.key === "8":
      event.preventDefault();
      applyMarkdownAction("unordered-list");
      return;

    case event.altKey && event.key === "1":
      event.preventDefault();
      applyHeadingShortcut(1);
      return;

    case event.altKey && event.key === "2":
      event.preventDefault();
      applyHeadingShortcut(2);
      return;

    case event.altKey && event.key === "3":
      event.preventDefault();
      applyHeadingShortcut(3);
      return;
  }
}

/* =========================================================
   NARZĘDZIA INTERFEJSU
   ========================================================= */

async function copyToClipboard(text, button) {

  if (!text) {
    return;
  }

  try {

    await navigator.clipboard.writeText(text);

    const oldHtml = button?.innerHTML;

    if (button) button.innerHTML =
      '<i class="fa-solid fa-check"></i>';

    button?.classList.add("success");

    setTimeout(() => {

      if (button) button.innerHTML = oldHtml;

      button?.classList.remove("success");

    }, 1200);

  }
  catch {

    alert("Nie udało się skopiować.");

  }

}

function handlePreviewImageClick(event) {
  const image = event.target.closest("img");

  if (!image || !markdownPreview.contains(image)) {
    clearPreviewImageSelection();
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  selectPreviewImage(image);
}

function selectPreviewImage(image) {
  clearPreviewImageSelection();

  const wrapper = image.closest(
    ".preview-image-wrapper"
  );

  if (!wrapper) {
    return;
  }

  selectedPreviewImage = image;
  selectedPreviewImageWrapper = wrapper;

  wrapper.classList.add(
    "preview-image-selected"
  );
}

function clearPreviewImageSelection() {
  if (selectedPreviewImageWrapper) {
    selectedPreviewImageWrapper.classList.remove(
      "preview-image-selected"
    );
  }

  selectedPreviewImageWrapper = null;
  selectedPreviewImage = null;
}

function setConnectionState(state) {
  connectionStatus.classList.remove(
    "connected",
    "error"
  );

  if (state === "connected") {
    connectionStatus.classList.add("connected");
    connectionStatus.lastChild.textContent =
      " Połączono z D1";

    return;
  }

  if (state === "error") {
    connectionStatus.classList.add("error");
    connectionStatus.lastChild.textContent =
      " Błąd połączenia";

    return;
  }

  connectionStatus.lastChild.textContent =
    " Łączenie…";
}

function setLoginLoading(isLoading) {
  loginButton.disabled = isLoading;

  loginButton.innerHTML = isLoading
    ? '<i class="fa-solid fa-spinner fa-spin"></i> Sprawdzam dostęp'
    : '<i class="fa-solid fa-arrow-right-to-bracket"></i> Otwórz panel';
}

function setText(elementId, value) {
  const element =
    document.getElementById(elementId);

  if (element) {
    element.textContent =
      String(value ?? "—");
  }
}

function escapePreviewHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarkdownPreview() {
  clearPreviewImageSelection();
  const title = editorTitle.value.trim();
  const markdown = editorBody.value || "";

  updateEditorStatistics(markdown);

  if (!title && !markdown.trim()) {
    markdownPreview.innerHTML = `
      <p class="markdown-preview-empty">
        Podgląd pojawi się podczas pisania.
      </p>
    `;

    return;
  }

  if (
    typeof marked === "undefined" ||
    typeof DOMPurify === "undefined"
  ) {
    markdownPreview.textContent =
      "Nie udało się załadować modułu podglądu.";

    return;
  }

  const source = markdown.replace(
    /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,
    ""
  );

  const renderedBody = marked.parse(source, {
    breaks: true,
    gfm: true,
  });


  const renderedTitle = title
    ? `<h1>${escapePreviewHtml(title)}</h1>`
    : "";

  const sanitizedHtml = DOMPurify.sanitize(
    `${renderedTitle}${renderedBody}`
  );

  const previewContainer =
    document.createElement("div");

  previewContainer.innerHTML = sanitizedHtml;

  previewContainer
    .querySelectorAll("img")
    .forEach((image) => {
      const imageSource =
        image.getAttribute("src") || "";

      image.dataset.editorSrc = imageSource;

      if (imageSource.startsWith("/")) {
        const isLocalDevelopment =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        const displayImageUrl =
          isLocalDevelopment
            ? buildGitHubRawMediaUrl(
              imageSource
            )
            : new URL(
              imageSource,
              "https://minimalistycznie.pages.dev"
            ).href;

        image.src =
          addMediaCacheVersion(
            displayImageUrl
          );
      }

      image.loading = "lazy";

      const wrapper =
        document.createElement("figure");

      wrapper.className =
        "preview-image-wrapper";
      wrapper.style.margin = "1.5em auto";

      const declaredWidth = Number.parseInt(image.getAttribute("width"), 10);
      if (Number.isFinite(declaredWidth) && declaredWidth > 0) {
        wrapper.style.width = `${declaredWidth}px`;
        wrapper.style.maxWidth = "100%";
        image.style.width = "100%";
        image.style.height = "auto";
      }

      const resizeHandle =
        document.createElement("span");

      resizeHandle.className =
        "preview-image-resize-handle";

      resizeHandle.setAttribute(
        "aria-hidden",
        "true"
      );

      image.replaceWith(wrapper);
      wrapper.append(image, resizeHandle);
    });

  markdownPreview.innerHTML =
    previewContainer.innerHTML;
}

function updateEditorStatistics(markdown) {
  const text = String(markdown || "").trim();

  const characters = text.length;

  const words = text
    ? text.split(/\s+/).filter(Boolean).length
    : 0;

  const readingMinutes =
    words === 0
      ? 0
      : Math.max(1, Math.ceil(words / 200));

  editorStatistics.textContent =
    `${words} słów · ${characters} znaków · ` +
    `${readingMinutes} min czytania`;
}

function showMessage(
  element,
  text,
  type = ""
) {
  if (!element) {
    return;
  }

  element.textContent = text;

  element.className =
    element.id === "loginMessage"
      ? "form-message"
      : "global-message";

  if (type) {
    element.classList.add(type);
  }
}

async function deleteSelectedMedia() {
  if (!selectedMedia) {
    return;
  }

  const mediaToDelete =
    selectedMedia;

  const confirmed = window.confirm(
    `Czy na pewno chcesz usunąć obraz?\n\n${mediaToDelete.name}\n\nTej operacji nie można cofnąć z poziomu panelu.`
  );

  if (!confirmed) {
    return;
  }

  deleteMediaButton.disabled = true;
  deleteMediaButton.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Usuwanie...
  `;

  try {
    const response = await fetch(
      ADMIN_DELETE_MEDIA_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${adminSecret}`,
        },
        body: JSON.stringify({
          name:
            mediaToDelete.name,
          path:
            mediaToDelete.path,
          sha:
            mediaToDelete.sha,
        }),
      }
    );

    const result =
      await response.json();

    if (
      !response.ok ||
      result.success !== true
    ) {
      throw new Error(
        result.message ||
        "Nie udało się usunąć obrazu."
      );
    }

    mediaItems = mediaItems.filter(
      (item) =>
        item.path !==
        mediaToDelete.path
    );

    closeMediaPanel();

    selectedMediaCard = null;

    renderMedia();

    showMessage(
      globalMessage,
      "Obraz został usunięty. Cloudflare opublikuje nową wersję strony.",
      "success"
    );
  } catch (error) {
    showMessage(
      globalMessage,
      error instanceof Error
        ? error.message
        : "Nie udało się usunąć obrazu.",
      "error"
    );
  } finally {
    deleteMediaButton.disabled = false;
    deleteMediaButton.innerHTML = `
      <i class="fa-regular fa-trash-can"></i>
      Usuń
    `;
  }
}

function applyHeadingShortcut(level) {
  const start = editorBody.selectionStart;
  const end = editorBody.selectionEnd;
  const selectedText = editorBody.value.slice(start, end);

  const headingPrefix = `${"#".repeat(level)} `;
  const placeholder = `Nagłówek H${level}`;

  insertMarkdownSyntax({
    start,
    end,
    selectedText,
    before: headingPrefix,
    after: "",
    placeholder,
    block: true,
  });
}

function applyMarkdownAction(action) {
  const start = editorBody.selectionStart;
  const end = editorBody.selectionEnd;
  const selectedText = editorBody.value.slice(start, end);

  const actions = {
    bold: {
      before: "**",
      after: "**",
      placeholder: "pogrubiony tekst",
    },
    italic: {
      before: "*",
      after: "*",
      placeholder: "tekst kursywą",
    },
    heading: {
      before: "## ",
      after: "",
      placeholder: "Nagłówek",
      block: true,
    },
    quote: {
      before: "> ",
      after: "",
      placeholder: "Treść cytatu",
      block: true,
    },
    "unordered-list": {
      before: "- ",
      after: "",
      placeholder: "Element listy",
      block: true,
    },
    "ordered-list": {
      before: "1. ",
      after: "",
      placeholder: "Element listy",
      block: true,
    },
    link: {
      before: "[",
      after: "](https://)",
      placeholder: "tekst linku",
    },
    image: {
      before: "![",
      after: "](/images/nazwa-pliku.jpg)",
      placeholder: "opis obrazu",
    },
    code: {
      before: selectedText.includes("\n") ? "```\n" : "`",
      after: selectedText.includes("\n") ? "\n```" : "`",
      placeholder: selectedText.includes("\n")
        ? "fragment kodu"
        : "kod",
    },
    separator: {
      before: "\n---\n",
      after: "",
      placeholder: "",
      block: true,
    },
  };

  const config = actions[action];

  if (!config) {
    return;
  }

  insertMarkdownSyntax({
    start,
    end,
    selectedText,
    ...config,
  });
}

function insertMarkdownSyntax({
  start,
  end,
  selectedText,
  before,
  after,
  placeholder,
  block = false,
}) {
  const originalValue = editorBody.value;
  const text = selectedText || placeholder;

  let prefix = before;
  let suffix = after;

  if (block && start > 0 && originalValue[start - 1] !== "\n") {
    prefix = `\n${prefix}`;
  }

  if (
    block &&
    end < originalValue.length &&
    originalValue[end] !== "\n"
  ) {
    suffix = `${suffix}\n`;
  }

  const insertedValue = `${prefix}${text}${suffix}`;

  editorBody.value =
    originalValue.slice(0, start) +
    insertedValue +
    originalValue.slice(end);

  const selectionStart =
    start + prefix.length;

  const selectionEnd =
    selectionStart + text.length;

  editorBody.focus();
  editorBody.setSelectionRange(
    selectionStart,
    selectionEnd
  );

  editorBody.dispatchEvent(
    new Event("input", {
      bubbles: true,
    })
  );
}

function handlePostsSearchKeyboard(event) {
  const visiblePosts = [
    ...document.querySelectorAll(".post-item"),
  ].filter((item) => item.style.display !== "none");

  if (visiblePosts.length === 0) {
    activeSearchResultIndex = -1;
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();

    activeSearchResultIndex++;

    if (activeSearchResultIndex >= visiblePosts.length) {
      activeSearchResultIndex = 0;
    }

    highlightSearchResult(
      visiblePosts,
      activeSearchResultIndex
    );

    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    activeSearchResultIndex--;

    if (activeSearchResultIndex < 0) {
      activeSearchResultIndex =
        visiblePosts.length - 1;
    }

    highlightSearchResult(
      visiblePosts,
      activeSearchResultIndex
    );

    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();

    const selectedItem =
      activeSearchResultIndex >= 0
        ? visiblePosts[activeSearchResultIndex]
        : visiblePosts[0];

    document
      .querySelectorAll(".post-item")
      .forEach((item) => {
        item.classList.remove("keyboard-active");
      });

    activeSearchResultIndex = -1;

    selectedItem.click();
    postsSearchInput.blur();

    return;
  }
}

function highlightSearchResult(items, activeIndex) {
  document
    .querySelectorAll(".post-item")
    .forEach((item) => {
      item.classList.remove("keyboard-active");
    });

  const activeItem = items[activeIndex];

  if (!activeItem) {
    return;
  }

  activeItem.classList.add("keyboard-active");

  activeItem.scrollIntoView({
    block: "nearest",
    behavior: "smooth",
  });
}

async function uploadImageFile(file) {
  if (!file?.type?.startsWith("image/")) {
    throw new Error(
      `Plik "${file?.name || "bez nazwy"}" nie jest obrazem.`
    );
  }

  const base64 = await fileToBase64(file);
  const response = await fetch(
    ADMIN_UPLOAD_IMAGE_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminSecret}`,
      },
      body: JSON.stringify({
        fileName: file.name,
        mimeType: file.type,
        contentBase64: base64,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || result.success !== true) {
    throw new Error(
      result.message ||
      `Nie udało się wysłać obrazu "${file.name}".`
    );
  }

  return result;
}

async function uploadMediaFiles(fileList) {
  const files = Array.from(fileList || []);

  if (files.length === 0) {
    return;
  }

  mediaUploadButton.disabled = true;
  mediaChooseButton.disabled = true;

  const originalUploadButtonHtml =
    mediaUploadButton.innerHTML;

  mediaUploadButton.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Wysyłanie...
  `;

  let uploadedCount = 0;
  const errors = [];

  for (const file of files) {
    mediaUploadButton.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Wysyłanie ${uploadedCount + errors.length + 1}/${files.length}...
    `;
    try {
      await uploadImageFile(file);
      uploadedCount++;
    } catch (error) {
      errors.push(
        error instanceof Error
          ? error.message
          : `Nie udało się wysłać pliku "${file.name}".`
      );
    }
  }

  try {
    if (uploadedCount > 0) {
      mediaLoaded = false;
      await loadMedia(true);

      showMessage(
        globalMessage,
        uploadedCount === 1
          ? "Obraz został dodany do biblioteki."
          : `Dodano ${uploadedCount} obrazów do biblioteki.`,
        "success"
      );
    }

    if (errors.length > 0) {
      showMessage(
        globalMessage,
        errors.join(" "),
        "error"
      );
    }
  } finally {
    mediaUploadButton.disabled = false;
    mediaChooseButton.disabled = false;
    mediaUploadButton.innerHTML =
      originalUploadButtonHtml;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",")
        ? result.split(",")[1]
        : result;

      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Nie udało się odczytać pliku."));
    };

    reader.readAsDataURL(file);
  });
}

async function loadMedia(forceRefresh = false) {
  if (mediaLoaded && !forceRefresh) {
    return;
  }

  mediaGrid.innerHTML = `
    <div class="media-placeholder">
      <i class="fa-solid fa-spinner fa-spin"></i>
      <strong>Ładowanie obrazów...</strong>
    </div>
  `;

  try {
    const response = await fetch(
      ADMIN_MEDIA_API_URL,
      {
        method: "GET",
        headers: {
          Authorization:
            `Bearer ${adminSecret}`,
        },
      }
    );

    const result = await response.json();

    if (
      !response.ok ||
      result.success !== true
    ) {
      throw new Error(
        result.message ||
        "Nie udało się pobrać obrazów."
      );
    }

    mediaItems = Array.isArray(result.images)
      ? result.images
      : [];

    mediaLoaded = true;

    renderMedia();
  } catch (error) {
    mediaGrid.innerHTML = "";

    const errorMessage =
      document.createElement("div");

    errorMessage.className =
      "media-placeholder";

    errorMessage.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation"></i>
      <strong>Nie udało się pobrać obrazów</strong>
      <span></span>
    `;

    errorMessage.querySelector("span").textContent =
      error instanceof Error
        ? error.message
        : "Wystąpił nieznany błąd.";

    mediaGrid.appendChild(errorMessage);
  }
}

function renderMedia() {
  if (!mediaGrid || !mediaSearchInput) {
    return;
  }

  const searchValue =
    mediaSearchInput.value
      .trim()
      .toLowerCase();

  const filteredItems =
    mediaItems.filter((item) => {
      const matchesSearch = String(item.name || "")
        .toLowerCase()
        .includes(searchValue);
      const extension = String(item.name || "")
        .split(".")
        .pop()
        .toLowerCase();

      return matchesSearch &&
        (mediaTypeFilter === "all" || extension === mediaTypeFilter);
    });

  filteredItems.sort(compareMediaItems);

  mediaGrid.innerHTML = "";

  if (filteredItems.length === 0) {
    const emptyMessage =
      document.createElement("div");

    emptyMessage.className =
      "media-placeholder";

    emptyMessage.innerHTML = `
      <i class="fa-regular fa-image"></i>
      <strong>Brak obrazów</strong>
      <span></span>
    `;

    const message =
      emptyMessage.querySelector("span");

    if (message) {
      message.textContent =
        searchValue
          ? "Nie znaleziono obrazów pasujących do wyszukiwania."
          : "Dodaj pierwszy obraz do biblioteki.";
    }

    mediaGrid.appendChild(emptyMessage);
    return;
  }

  filteredItems.forEach((item) => {
    const card =
      document.createElement("button");

    card.type = "button";
    card.className = "media-card";
    card.draggable = true;
    card.title = "Kliknij, aby wybrać; przeciągnij do edytora";
    card.dataset.mediaName = item.name || "";

    card.addEventListener("dragstart", (event) => {
      const url = getMediaUrl(item);
      const alt = String(item.name || "Obraz").replace(/\.[^.]+$/, "");
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("text/plain", `![${alt}](${url})`);
      event.dataTransfer.setData("application/x-panel-media", JSON.stringify({ url, alt }));
    });

    const image =
      document.createElement("img");

    image.src =
      addMediaCacheVersion(
        getMediaUrl(item, true),
        item.sha
      );

    image.alt =
      item.name || "Obraz";

    image.loading = "lazy";

    image.addEventListener(
      "error",
      () => {
        console.error(
          "Błąd miniatury:",
          item.name,
          image.src
        );
      },
      {
        once: true,
      }
    );

    const details =
      document.createElement("span");

    details.className =
      "media-card-details";

    const name =
      document.createElement("strong");

    name.textContent =
      item.name || "Bez nazwy";

    const size =
      document.createElement("span");

    size.textContent =
      formatFileSize(item.size);

    details.append(
      name,
      size
    );

    card.append(
      image,
      details
    );

    card.addEventListener("click", () => {

      if (selectedMediaCard) {
        selectedMediaCard.classList.remove("active");
      }

      selectedMediaCard = card;

      card.classList.add("active");

      openMediaSidebar(item);

    });

    mediaGrid.appendChild(card);
  });
}

function openMediaSidebar(item) {
  if (
    !item ||
    !mediaSidebar ||
    !mediaPreviewImage ||
    !mediaName ||
    !mediaUrl ||
    !mediaSize
  ) {
    console.error(
      "Brakuje elementów panelu szczegółów mediów."
    );

    return;
  }

  selectedMedia = item;

  const originalImageUrl =
    getMediaUrl(item, true);

  const displayImageUrl =
    addMediaCacheVersion(
      originalImageUrl,
      item.sha
    );

  const mediaType =
    document.getElementById(
      "mediaType"
    );

  const mediaDimensions =
    document.getElementById(
      "mediaDimensions"
    );

  mediaName.value =
    item.name || "";

  mediaUrl.value =
    getMediaUrl(item);

  mediaSize.textContent =
    formatFileSize(item.size);

  if (mediaType) {
    mediaType.textContent =
      getMediaFileType(item.name);
  }

  if (mediaDimensions) {
    mediaDimensions.textContent =
      "Ładowanie…";
  }

  /*
   * Najpierw ustawiamy obsługę zdarzeń,
   * dopiero potem przypisujemy src.
   */
  mediaPreviewImage.onload = () => {
    if (mediaDimensions) {
      mediaDimensions.textContent =
        `${mediaPreviewImage.naturalWidth} × ` +
        `${mediaPreviewImage.naturalHeight}`;
    }
  };

  mediaPreviewImage.onerror = () => {
    if (mediaDimensions) {
      mediaDimensions.textContent =
        "Nie udało się załadować";
    }

    console.error(
      "Nie udało się załadować obrazu:",
      displayImageUrl
    );
  };

  mediaPreviewImage.alt =
    item.name || "Podgląd obrazu";

  mediaPreviewImage.removeAttribute(
    "src"
  );

  mediaPreviewImage.src =
    displayImageUrl;

  mediaSidebar.hidden = false;
}

function getMediaFileType(fileName) {
  const extension =
    String(fileName || "")
      .split(".")
      .pop()
      .toUpperCase();

  const typeNames = {
    JPG: "JPEG",
    JPEG: "JPEG",
    PNG: "PNG",
    WEBP: "WebP",
    GIF: "GIF",
    SVG: "SVG",
    AVIF: "AVIF",
  };

  return typeNames[extension] ||
    extension ||
    "Nieznany";
}

function getMediaUrl(item, absolute = false) {
  if (!item) {
    return "";
  }

  const relativeUrl =
    item.url ||
    item.relativeUrl ||
    item.publicUrl ||
    (
      item.path
        ? `/${String(item.path).replace(/^\/+/, "")}`
        : ""
    );

  /*
   * Do Markdowna i zapisu wpisu zawsze zwracamy
   * czystą, względną ścieżkę.
   */
  if (!absolute) {
    return (
      relativeUrl ||
      item.absoluteUrl ||
      item.downloadUrl ||
      item.download_url ||
      ""
    );
  }

  const isLocalDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  /*
   * Firefox może blokować osadzanie zasobów
   * z Pages podczas pracy na localhost.
   *
   * Lokalnie korzystamy więc z raw.githubusercontent.com,
   * który zwraca obraz z właściwym typem MIME.
   */
  if (isLocalDevelopment) {
    const rawUrl =
      item.downloadUrl ||
      item.download_url ||
      "";

    if (rawUrl) {
      return rawUrl;
    }

    if (relativeUrl) {
      return buildGitHubRawMediaUrl(
        relativeUrl
      );
    }
  }

  /*
   * W opublikowanym panelu preferujemy adres bloga,
   * ponieważ wtedy obrazy są ładowane z tej samej domeny.
   */
  const explicitAbsoluteUrl =
    item.absoluteUrl ||
    item.downloadUrl ||
    item.download_url ||
    "";

  if (explicitAbsoluteUrl) {
    return explicitAbsoluteUrl;
  }

  return relativeUrl
    ? new URL(
      relativeUrl,
      "https://minimalistycznie.pages.dev"
    ).href
    : "";
}

function buildGitHubRawMediaUrl(
  relativeUrl
) {
  const cleanPath =
    String(relativeUrl || "")
      .replace(/^https?:\/\/[^/]+/i, "")
      .replace(/^\/+/, "");

  if (!cleanPath) {
    return "";
  }

  return (
    "https://raw.githubusercontent.com/" +
    "Dasqez/blog/main/" +
    cleanPath
  );
}

function addMediaCacheVersion(
  url,
  version = ""
) {
  if (!url) {
    return "";
  }

  try {
    const parsedUrl =
      new URL(
        url,
        window.location.origin
      );

    parsedUrl.searchParams.set(
      "v",
      version || Date.now().toString()
    );

    return parsedUrl.href;
  } catch {
    const separator =
      url.includes("?") ? "&" : "?";

    return (
      `${url}${separator}v=` +
      encodeURIComponent(
        version || Date.now().toString()
      )
    );
  }
}

function closeMediaPanel() {
  if (mediaSidebar) {
    mediaSidebar.hidden = true;
  }

  if (selectedMediaCard) {
    selectedMediaCard.classList.remove(
      "active"
    );
  }

  selectedMedia = null;
  selectedMediaCard = null;

  mediaPreviewImage.onload = null;
  mediaPreviewImage.onerror = null;
  mediaPreviewImage.removeAttribute("src");
  mediaPreviewImage.alt = "";

  mediaName.value = "";
  mediaUrl.value = "";
  mediaSize.textContent = "";

  const mediaType =
    document.getElementById(
      "mediaType"
    );

  const mediaDimensions =
    document.getElementById(
      "mediaDimensions"
    );

  if (mediaType) {
    mediaType.textContent = "";
  }

  if (mediaDimensions) {
    mediaDimensions.textContent = "";
  }
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0);

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(
      size / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

/* =========================================================
   MEDIA V3 I RESIZE OBRAZÓW
   ========================================================= */

function compareMediaItems(left, right) {
  const leftName = String(left?.name || "");
  const rightName = String(right?.name || "");
  const leftDate = Date.parse(left?.updatedAt || left?.createdAt || left?.date || "") || 0;
  const rightDate = Date.parse(right?.updatedAt || right?.createdAt || right?.date || "") || 0;
  const leftSize = Number(left?.size || 0);
  const rightSize = Number(right?.size || 0);

  switch (mediaSortOrder) {
    case "oldest": return leftDate - rightDate;
    case "name-asc": return leftName.localeCompare(rightName, "pl", { sensitivity: "base" });
    case "name-desc": return rightName.localeCompare(leftName, "pl", { sensitivity: "base" });
    case "size-asc": return leftSize - rightSize;
    case "size-desc": return rightSize - leftSize;
    default: return rightDate - leftDate;
  }
}

function ensureMediaV3Controls() {
  if (!mediaGrid || document.getElementById("mediaV3Controls")) return;

  if (!document.getElementById("mediaV3Styles")) {
    const style = document.createElement("style");
    style.id = "mediaV3Styles";
    style.textContent = `
      .media-v3-controls{display:flex;flex-wrap:wrap;gap:.75rem;margin:0 0 1rem}
      .media-v3-controls label{display:flex;align-items:center;gap:.4rem}
      .media-card[draggable="true"]{cursor:grab}.media-card[draggable="true"]:active{cursor:grabbing}
      .preview-image-wrapper{position:relative;max-width:100%}
      .preview-image-wrapper img{display:block;max-width:100%}
      .preview-image-resize-handle{display:none;position:absolute;right:-6px;bottom:-6px;width:14px;height:14px;border:2px solid #fff;border-radius:50%;background:#2563eb;cursor:nwse-resize;touch-action:none}
      .preview-image-selected{outline:2px solid #2563eb;outline-offset:3px}
      .preview-image-selected .preview-image-resize-handle{display:block}
      .media-fullscreen-dialog{width:min(96vw,1400px);height:min(94vh,1000px);padding:2.5rem 1rem 1rem;border:0;border-radius:12px;background:#111;color:#fff}
      .media-fullscreen-dialog::backdrop{background:rgba(0,0,0,.85)}
      .media-fullscreen-dialog img{display:block;width:100%;height:calc(100% - 2rem);object-fit:contain}
      .media-fullscreen-dialog p{text-align:center;margin:.5rem 0 0}
      .media-fullscreen-close{position:absolute;right:.75rem;top:.5rem;border:0;background:transparent;color:#fff;font-size:2rem;cursor:pointer}
      .media-fullscreen-button{margin:.5rem 0}
    `;
    document.head.appendChild(style);
  }

  const controls = document.createElement("div");
  controls.id = "mediaV3Controls";
  controls.className = "media-v3-controls";
  controls.setAttribute("aria-label", "Filtrowanie i sortowanie mediów");
  controls.innerHTML = `
    <label>Typ
      <select id="mediaTypeFilter">
        <option value="all">Wszystkie</option>
        <option value="jpg">JPG</option><option value="jpeg">JPEG</option>
        <option value="png">PNG</option><option value="webp">WebP</option>
        <option value="gif">GIF</option><option value="svg">SVG</option>
        <option value="avif">AVIF</option>
      </select>
    </label>
    <label>Sortuj
      <select id="mediaSortOrder">
        <option value="newest">Najnowsze</option><option value="oldest">Najstarsze</option>
        <option value="name-asc">Nazwa A–Z</option><option value="name-desc">Nazwa Z–A</option>
        <option value="size-desc">Największe</option><option value="size-asc">Najmniejsze</option>
      </select>
    </label>`;
  mediaGrid.parentElement?.insertBefore(controls, mediaGrid);

  if (mediaPreviewImage && !document.getElementById("mediaFullscreenButton")) {
    const fullscreenButton = document.createElement("button");
    fullscreenButton.id = "mediaFullscreenButton";
    fullscreenButton.type = "button";
    fullscreenButton.className = "media-fullscreen-button";
    fullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i> Pełny ekran';
    fullscreenButton.addEventListener("click", () => openMediaFullscreen());
    mediaPreviewImage.insertAdjacentElement("afterend", fullscreenButton);
  }

  controls.querySelector("#mediaTypeFilter")?.addEventListener("change", (event) => {
    mediaTypeFilter = event.target.value;
    renderMedia();
  });
  controls.querySelector("#mediaSortOrder")?.addEventListener("change", (event) => {
    mediaSortOrder = event.target.value;
    renderMedia();
  });
}

function openMediaFullscreen(item = selectedMedia) {
  if (!item) return;
  let dialog = document.getElementById("mediaFullscreenDialog");

  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "mediaFullscreenDialog";
    dialog.className = "media-fullscreen-dialog";
    dialog.innerHTML = `
      <button type="button" class="media-fullscreen-close" aria-label="Zamknij">×</button>
      <img alt=""><p></p>`;
    document.body.appendChild(dialog);
    dialog.querySelector("button")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  const image = dialog.querySelector("img");
  image.src = getMediaUrl(item, true);
  image.alt = item.name || "Podgląd obrazu";
  dialog.querySelector("p").textContent = item.name || "";
  dialog.showModal();
}

function markdownImageToHtml(source, alt, width) {
  const safeSource = String(source).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const safeAlt = String(alt || "Obraz").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return `<img src="${safeSource}" alt="${safeAlt}" width="${width}">`;
}

function savePreviewImageWidth(image, width) {
  const source = image.dataset.editorSrc || image.getAttribute("src") || "";
  const alt = image.getAttribute("alt") || "Obraz";
  const body = editorBody.value;
  const escapedSource = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const markdownPattern = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedSource}(?:\\s+["'][^"']*["'])?\\)`);
  const htmlPattern = new RegExp(`<img\\b([^>]*?)src=["']${escapedSource}["']([^>]*?)>`, "i");
  let nextBody = body;

  if (markdownPattern.test(body)) {
    nextBody = body.replace(markdownPattern, (match, markdownAlt) =>
      markdownImageToHtml(source, markdownAlt || alt, width));
  } else if (htmlPattern.test(body)) {
    nextBody = body.replace(htmlPattern, (match) => {
      if (/\bwidth\s*=/.test(match)) return match.replace(/\bwidth\s*=\s*["']?\d+["']?/i, `width="${width}"`);
      return match.replace(/\s*\/?\s*>$/, ` width="${width}">`);
    });
  }

  if (nextBody !== body) {
    editorBody.value = nextBody;
    editorBody.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

function beginPreviewResize(event) {
  const handle = event.target.closest(".preview-image-resize-handle");
  if (!handle || !markdownPreview.contains(handle)) return;
  const wrapper = handle.closest(".preview-image-wrapper");
  const image = wrapper?.querySelector("img");
  if (!wrapper || !image) return;

  event.preventDefault();
  selectPreviewImage(image);
  const bounds = wrapper.getBoundingClientRect();
  const containerWidth = markdownPreview.getBoundingClientRect().width;
  previewResizeSession = {
    wrapper, image, startX: event.clientX, startWidth: bounds.width,
    minWidth: Math.min(120, containerWidth), maxWidth: Math.max(120, containerWidth)
  };
  handle.setPointerCapture?.(event.pointerId);
}

function movePreviewResize(event) {
  if (!previewResizeSession) return;
  const session = previewResizeSession;
  const width = Math.round(Math.max(session.minWidth,
    Math.min(session.maxWidth, session.startWidth + event.clientX - session.startX)));
  session.wrapper.style.width = `${width}px`;
  session.wrapper.style.maxWidth = "100%";
  session.image.style.width = "100%";
  session.image.style.height = "auto";
  session.width = width;
}

function finishPreviewResize() {
  if (!previewResizeSession) return;
  const { image, width, startWidth } = previewResizeSession;
  previewResizeSession = null;
  savePreviewImageWidth(image, width || Math.round(startWidth));
}

function insertDroppedMedia(event) {
  const encoded = event.dataTransfer?.getData("application/x-panel-media");
  if (!encoded || !editorBody) return;
  event.preventDefault();
  try {
    const item = JSON.parse(encoded);
    const position = editorBody.selectionStart ?? editorBody.value.length;
    editorBody.setSelectionRange(position, position);
    insertImageMarkdown(item.url, item.alt);
  } catch (error) {
    console.error("Nie udało się wstawić przeciągniętego obrazu.", error);
  }
}

function initializeMediaV3() {
  ensureMediaV3Controls();
  markdownPreview?.addEventListener("pointerdown", beginPreviewResize);
  document.addEventListener("pointermove", movePreviewResize);
  document.addEventListener("pointerup", finishPreviewResize);
  editorBody?.addEventListener("dragover", (event) => {
    if (event.dataTransfer?.types.includes("application/x-panel-media")) event.preventDefault();
  });
  editorBody?.addEventListener("drop", insertDroppedMedia);
  mediaPreviewImage?.addEventListener("dblclick", () => openMediaFullscreen());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.getElementById("mediaFullscreenDialog")?.open) {
      document.getElementById("mediaFullscreenDialog").close();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c" && selectedMedia &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      copyToClipboard(getMediaUrl(selectedMedia), copyMediaUrl || selectedMediaCard);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMediaV3, { once: true });
} else {
  initializeMediaV3();
}
