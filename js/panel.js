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

const ADMIN_PAGES_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/pages";

const ADMIN_PAGE_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/page";

const ADMIN_UPDATE_PAGE_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/page/update";

const ADMIN_CREATE_PAGE_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/page/create";
const ADMIN_DELETE_PAGE_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/page/delete";
const ADMIN_DUPLICATE_PAGE_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/page/duplicate";
const ADMIN_REORDER_PAGES_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/pages/reorder";
const ADMIN_PAGE_HISTORY_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/page/history";
const ADMIN_PAGE_ROLLBACK_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/page/rollback";

const ADMIN_UPLOAD_IMAGE_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/upload-image";  

const ADMIN_MEDIA_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/media";  

const ADMIN_DELETE_MEDIA_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/media/delete";  
const ADMIN_BULK_DELETE_MEDIA_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/media/delete-bulk";
const ADMIN_NEWSLETTERS_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/newsletters";
const ADMIN_SEND_NEWSLETTER_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/newsletter/send";
const ADMIN_TEST_NEWSLETTER_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/newsletter/test";
const ADMIN_SUBSCRIBERS_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/subscribers";
const ADMIN_BACKUP_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/backup";
const ADMIN_SETTINGS_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/settings";
const ADMIN_SESSION_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/session";
const ADMIN_SESSION_REFRESH_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/session/refresh";
const ADMIN_SESSION_LOGOUT_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/session/logout";
const LOCAL_SETTINGS_PREVIEW_KEY = "cms-local-site-settings-preview";
const ADMIN_SESSION_STORAGE_KEY = "mpzPanelSessionV1";
const ADMIN_SESSION_IDLE_MS = 30 * 60 * 1000;
const ADMIN_SESSION_MAX_MS = 8 * 60 * 60 * 1000;
const ADMIN_SESSION_REFRESH_MARGIN_MS = 2 * 60 * 1000;

const EDITOR_DRAFT_STORAGE_KEY = "mpzPanelEditorDraftV092";
const EDITOR_AUTOSAVE_INTERVAL_MS = 30000;
const EDITOR_AUTOSAVE_TOAST_DURATION_MS = 3000;

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
const mediaUploadStatus =
  document.getElementById("mediaUploadStatus");
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
const dashboardNewPost = document.getElementById("dashboardNewPost");
const dashboardRecentContent = document.getElementById("dashboardRecentContent");
const dashboardContentMetrics = document.getElementById("dashboardContentMetrics");
const dashboardNewsletterMetrics = document.getElementById("dashboardNewsletterMetrics");
const newsletterPostSelect = document.getElementById("newsletterPostSelect");
const newsletterSubject = document.getElementById("newsletterSubject");
const newsletterExcerpt = document.getElementById("newsletterExcerpt");
const newsletterImage = document.getElementById("newsletterImage");
const newsletterTestEmail = document.getElementById("newsletterTestEmail");
const newsletterTestButton = document.getElementById("newsletterTestButton");
const newsletterSendButton = document.getElementById("newsletterSendButton");
const newsletterActionStatus = document.getElementById("newsletterActionStatus");
const newsletterPreviewFrame = document.getElementById("newsletterPreviewFrame");
const newsletterHtmlPreview = document.getElementById("newsletterHtmlPreview");
const newsletterQueueList = document.getElementById("newsletterQueueList");
const newsletterHistoryList = document.getElementById("newsletterHistoryList");
const newsletterPreviewButtons = document.querySelectorAll("[data-newsletter-preview]");
const globalSearch = document.getElementById("globalSearch");
const globalSearchInput = document.getElementById("globalSearchInput");
const globalSearchResults = document.getElementById("globalSearchResults");
const downloadAllBackupsButton = document.getElementById("downloadAllBackupsButton");
const backupDownloadButtons = document.querySelectorAll("[data-download-backup]");
const backupProgress = document.getElementById("backupProgress");
const backupProgressTitle = document.getElementById("backupProgressTitle");
const backupProgressValue = document.getElementById("backupProgressValue");
const backupProgressBar = document.getElementById("backupProgressBar");
const backupStatus = document.getElementById("backupStatus");
const settingsForm = document.getElementById("settingsForm");
const saveSettingsButton = document.getElementById("saveSettingsButton");
const settingsStatus = document.getElementById("settingsStatus");
const settingsFields = {
  name: document.getElementById("settingSiteName"), slogan: document.getElementById("settingSiteSlogan"), url: document.getElementById("settingSiteUrl"), favicon: document.getElementById("settingFavicon"), logo: document.getElementById("settingLogo"), theme: document.getElementById("settingTheme"),
  nameVisible: document.getElementById("settingNameVisible"), sloganVisible: document.getElementById("settingSloganVisible"), faviconVisible: document.getElementById("settingFaviconVisible"), logoVisible: document.getElementById("settingLogoVisible"),
  facebook: document.getElementById("settingFacebook"), instagram: document.getElementById("settingInstagram"), x: document.getElementById("settingX"), github: document.getElementById("settingGithub"), googleAnalyticsId: document.getElementById("settingGoogleAnalytics"), newsletterEnabled: document.getElementById("settingNewsletterEnabled"),
  facebookVisible: document.getElementById("settingFacebookVisible"), instagramVisible: document.getElementById("settingInstagramVisible"), xVisible: document.getElementById("settingXVisible"), githubVisible: document.getElementById("settingGithubVisible"),
  giscusEnabled: document.getElementById("settingGiscusEnabled"), giscusRepo: document.getElementById("settingGiscusRepo"), giscusRepoId: document.getElementById("settingGiscusRepoId"), giscusCategory: document.getElementById("settingGiscusCategory"), giscusCategoryId: document.getElementById("settingGiscusCategoryId"),
};
const settingsPreview = document.getElementById("settingsPreview");
const settingsNamePreview = document.getElementById("settingsNamePreview");
const settingsSloganPreview = document.getElementById("settingsSloganPreview");
const settingsLogoPreview = document.getElementById("settingsLogoPreview");
const settingsFaviconPreview = document.getElementById("settingsFaviconPreview");
const settingsSocialPreviews = {
  facebook: document.getElementById("settingsFacebookPreview"), instagram: document.getElementById("settingsInstagramPreview"), x: document.getElementById("settingsXPreview"), github: document.getElementById("settingsGithubPreview"),
};
const panelThemeButton = document.getElementById("panelThemeButton");
const shortcutsButton = document.getElementById("shortcutsButton");
const shortcutsDialog = document.getElementById("shortcutsDialog");
const closeShortcutsButton = document.getElementById("closeShortcutsButton");
const contentContextMenu = document.getElementById("contentContextMenu");
const PANEL_THEME_STORAGE_KEY = "mpz-panel-theme";
let contextMenuType = "";
const pagesList = document.getElementById("pagesList");
const pagesSearchInput = document.getElementById("pagesSearchInput");
const reloadPagesButton = document.getElementById("reloadPagesButton");
const pagePreviewTitle = document.getElementById("pagePreviewTitle");
const pagePreviewPath = document.getElementById("pagePreviewPath");
const pagePreviewExcerpt = document.getElementById("pagePreviewExcerpt");
const openPageButton = document.getElementById("openPageButton");
const editPageButton = document.getElementById("editPageButton");
const newPageButton = document.getElementById("newPageButton");
const duplicatePageButton = document.getElementById("duplicatePageButton");
const deletePageButton = document.getElementById("deletePageButton");
const pageHistoryButton = document.getElementById("pageHistoryButton");
const pageHistoryDialog = document.getElementById("pageHistoryDialog");
const pageHistoryTitle = document.getElementById("pageHistoryTitle");
const pageHistoryList = document.getElementById("pageHistoryList");
const closePageHistoryButton = document.getElementById("closePageHistoryButton");
const closeEditorButton =
    document.getElementById("closeEditorButton");  

const editorPanel = document.getElementById("editorPanel");
const editorTitle = document.getElementById("editorTitle");
const editorSlug = document.getElementById("editorSlug");
const editorDate = document.getElementById("editorDate");
const editorLayout = document.getElementById("editorLayout");
const editorTags = document.getElementById("editorTags");
const editorBody = document.getElementById("editorBody");
const editorLineNumbers = document.getElementById("editorLineNumbers");
const editorHighlight = document.getElementById("editorHighlight");
const sitePreviewFrame = document.getElementById("sitePreviewFrame");
const editorFullscreenButton = document.getElementById("editorFullscreenButton");
const editorSaveStatus = document.getElementById("editorSaveStatus");
const editorFormatBadge = document.getElementById("editorFormatBadge");
const editorSourceLabel = document.getElementById("editorSourceLabel");
const previewDeviceButtons = document.querySelectorAll("[data-preview-device]");
const editorHistoryButtons = document.querySelectorAll("[data-editor-history]");
const sourceActionButtons = document.querySelectorAll("[data-source-action]");
const editorViewButtons = document.querySelectorAll("[data-editor-view]");
const editorFindButton = document.getElementById("editorFindButton");
const editorFindBar = document.getElementById("editorFindBar");
const editorFindInput = document.getElementById("editorFindInput");
const editorReplaceInput = document.getElementById("editorReplaceInput");
const editorFindCount = document.getElementById("editorFindCount");
const editorFindPrevious = document.getElementById("editorFindPrevious");
const editorFindNext = document.getElementById("editorFindNext");
const editorReplaceOne = document.getElementById("editorReplaceOne");
const editorReplaceAll = document.getElementById("editorReplaceAll");
const editorFindClose = document.getElementById("editorFindClose");
const editorOutline = document.getElementById("editorOutline");
const editorHeading = document.getElementById("editorHeading");
const editorTitleField = document.getElementById("editorTitleField");
const editorSlugField = document.getElementById("editorSlugField");
const editorDateField = document.getElementById("editorDateField");
const editorLayoutField = document.getElementById("editorLayoutField");
const editorTagsField = document.getElementById("editorTagsField");
const previewPostMeta = document.getElementById("previewPostMeta");
const previewReadingTime = document.getElementById("previewReadingTime");
const previewTags = document.getElementById("previewTags");
const markdownPreview =
  document.getElementById("markdownPreview");

const editorStatistics =
  document.getElementById("editorStatistics");
const qualityToolkit = document.getElementById("qualityToolkit");
const qualityScore = document.getElementById("qualityScore");
const qualityChecks = document.getElementById("qualityChecks");
const qualityToggle = document.getElementById("qualityToggle");
const ogPreviewTitle = document.getElementById("ogPreviewTitle");
const ogPreviewDescription = document.getElementById("ogPreviewDescription");
const ogPreviewUrl = document.getElementById("ogPreviewUrl");
const ogPreviewImage = document.getElementById("ogPreviewImage");
const editorSeoTitle = document.getElementById("editorSeoTitle");
const editorSeoDescription = document.getElementById("editorSeoDescription");
const editorSeoImage = document.getElementById("editorSeoImage");
const editorSeoCanonical = document.getElementById("editorSeoCanonical");
const editorSeoRobots = document.getElementById("editorSeoRobots");
const editorSeoTwitterCard = document.getElementById("editorSeoTwitterCard");
const editorSeoFields = [editorSeoTitle, editorSeoDescription, editorSeoImage, editorSeoCanonical, editorSeoRobots, editorSeoTwitterCard];
const markdownToolbarButtons =
  document.querySelectorAll("[data-markdown-action]");  

qualityToggle?.addEventListener("click", () => {
  const collapsed = qualityToolkit.classList.toggle("is-collapsed");
  qualityToggle.setAttribute("aria-expanded", String(!collapsed));
  qualityToggle.querySelector("span").textContent =
    collapsed ? "Pokaż szczegóły" : "Ukryj szczegóły";
  qualityToggle.querySelector("i").className =
    `fa-solid ${collapsed ? "fa-chevron-down" : "fa-chevron-up"}`;
});
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
const mediaDeleteProgressDialog = document.getElementById("mediaDeleteProgressDialog");
const mediaDeleteProgressTitle = document.getElementById("mediaDeleteProgressTitle");
const mediaDeleteProgressText = document.getElementById("mediaDeleteProgressText");
const mediaDeleteProgressBar = document.getElementById("mediaDeleteProgressBar");
const mediaDeleteProgressValue = document.getElementById("mediaDeleteProgressValue");
const cancelMediaDeleteButton = document.getElementById("cancelMediaDeleteButton");
const mediaUploadProgressDialog = document.getElementById("mediaUploadProgressDialog");
const mediaUploadProgressTitle = document.getElementById("mediaUploadProgressTitle");
const mediaUploadProgressText = document.getElementById("mediaUploadProgressText");
const mediaUploadProgressBar = document.getElementById("mediaUploadProgressBar");
const mediaUploadProgressValue = document.getElementById("mediaUploadProgressValue");
const cancelMediaUploadButton = document.getElementById("cancelMediaUploadButton");

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

let adminSecret = "";
let adminRefreshToken = "";
let adminSessionExpiresAt = 0;
let adminSessionStartedAt = 0;
let adminSessionLastActivityAt = 0;
let adminSessionLegacy = false;
let adminSessionTimer = null;

let posts = [];
let selectedPost = null;
let editedPost = null;
let postsLoaded = false;
let pages = [];
let pagesLoaded = false;
let selectedPage = null;
let editedPage = null;
let editorContentType = "post";
let slugEditedManually = false;
let isCreatingNewPost = false;
let isCreatingNewPage = false;
let activeSearchResultIndex = -1;
let selectedPreviewImageWrapper = null;
let selectedPreviewImage = null;
let previewResizeSession = null;

let mediaItems = [];
let mediaLoaded = false;
let selectedMedia = null;
let selectedMediaCard = null;
const selectedMediaPaths = new Set();
let mediaTypeFilter = "all";
let mediaSortOrder = "newest";
let editorSuspendedForMedia = false;
let editorBaseline = "";
let lastSavedDraftValues = "";
let editorDraftToastTimeout = null;
let editorAutosaveTimeout = null;
let editorTagsDraftTimeout = null;
let editorHistory = [];
let editorHistoryIndex = -1;
let applyingEditorHistory = false;
let editorFindMatches = [];
let editorFindIndex = -1;
let dashboardSummary = null;
let mediaDeleteController = null;
let mediaDeleteProgressTimer = null;
let mediaUploadController = null;
let newslettersLoaded = false;
let globalSearchSubscribers = [];
let globalSearchNewsletterHistory = [];
let globalSearchLoaded = false;
let globalSearchActiveIndex = -1;
let settingsLoaded = false;
let currentSiteSettings = null;

/* =========================================================
   LISTENERY
   ========================================================= */

deleteMediaButton?.addEventListener(
  "click",
  deleteSelectedMedia
);
cancelMediaDeleteButton?.addEventListener("click", () => {
  if (mediaDeleteController) {
    cancelMediaDeleteButton.disabled = true;
    mediaDeleteProgressText.textContent = "Anulowanie i sprawdzanie stanu biblioteki…";
    mediaDeleteController.abort();
  } else {
    mediaDeleteProgressDialog?.close();
  }
});
cancelMediaUploadButton?.addEventListener("click", () => {
  if (mediaUploadController) {
    cancelMediaUploadButton.disabled = true;
    mediaUploadProgressText.textContent = "Anulowanie wysyłania…";
    mediaUploadController.abort();
  } else {
    mediaUploadProgressDialog?.close();
  }
});
newsletterPostSelect?.addEventListener("change", selectNewsletterPost);
[newsletterSubject, newsletterExcerpt, newsletterImage].forEach((field) => field?.addEventListener("input", () => { renderNewsletterPreview(); updateNewsletterActions(); }));
newsletterTestEmail?.addEventListener("input", updateNewsletterActions);
newsletterTestButton?.addEventListener("click", sendNewsletterTest);
newsletterSendButton?.addEventListener("click", () => sendNewsletterCampaign(false));
newsletterPreviewButtons.forEach((button) => button.addEventListener("click", () => setNewsletterPreviewMode(button.dataset.newsletterPreview)));
globalSearchInput?.addEventListener("focus", openGlobalSearch);
globalSearchInput?.addEventListener("input", renderGlobalSearchResults);
globalSearchInput?.addEventListener("keydown", handleGlobalSearchKeydown);
document.addEventListener("click", (event) => {
  if (globalSearch && !globalSearch.contains(event.target)) closeGlobalSearch();
});
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    globalSearchInput?.focus();
    openGlobalSearch();
  }
  if (event.key === "Escape" && !globalSearchResults?.hidden) closeGlobalSearch();
});
backupDownloadButtons.forEach((button) => button.addEventListener("click", () => downloadBackup(button.dataset.downloadBackup, button)));
downloadAllBackupsButton?.addEventListener("click", downloadAllBackups);
settingsForm?.addEventListener("input", updateSettingsPreview);
saveSettingsButton?.addEventListener("click", saveSettings);
panelThemeButton?.addEventListener("click", togglePanelTheme);
shortcutsButton?.addEventListener("click", openShortcutsDialog);
closeShortcutsButton?.addEventListener("click", () => shortcutsDialog?.close());
shortcutsDialog?.addEventListener("click", (event) => { if (event.target === shortcutsDialog) shortcutsDialog.close(); });
document.addEventListener("contextmenu", handleContentContextMenu);
document.addEventListener("click", (event) => { if (!contentContextMenu?.contains(event.target)) closeContentContextMenu(); });
contentContextMenu?.addEventListener("click", handleContextMenuAction);
document.addEventListener("keydown", handleUxShortcuts);
applyPanelTheme(localStorage.getItem(PANEL_THEME_STORAGE_KEY) || "light");

insertMediaButton?.addEventListener("click", insertSelectedMediaToEditor);

downloadMediaButton?.addEventListener("click", downloadSelectedMedia);

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

mediaDropzone?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  mediaFileInput.click();
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

  setLoginLoading(true);

  const sessionReady = await createAdminSession(secret);
  if (!sessionReady) {
    setLoginLoading(false);
    return;
  }

  const success = await loadDashboardData();

  setLoginLoading(false);

  if (!success) {
    return;
  }

  persistAdminSession();
  startAdminSessionMonitoring();

  loginScreen.hidden = true;
  adminApp.hidden = false;
  secretInput.value = "";

  openView("dashboard");
});

logoutButton.addEventListener("click", logout);

refreshButton.addEventListener("click", async () => {
  globalSearchLoaded = false;
  await loadDashboardData();
});

reloadPostsButton.addEventListener("click", async () => {
  await loadPosts(true);
});

reloadPagesButton?.addEventListener("click", async () => {
  await loadPages(true);
});

pagesSearchInput?.addEventListener("input", filterPages);

editPageButton?.addEventListener("click", async () => {
  if (selectedPage) {
    await openPageEditor(selectedPage);
  }
});
newPageButton?.addEventListener("click", createNewPage);
duplicatePageButton?.addEventListener("click", duplicateSelectedPage);
deletePageButton?.addEventListener("click", deleteSelectedPage);
pageHistoryButton?.addEventListener("click", openPageHistory);
closePageHistoryButton?.addEventListener("click", () => pageHistoryDialog?.close());

newPostButton.addEventListener("click", () => {
  createNewPost();
});

dashboardNewPost?.addEventListener("click", () => {
  openView("posts");
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

  const deletedPaths = new Set();

  deletePostButton.disabled = true;
  deletePostButton.textContent = "Usuwanie...";

  try {
    const response = await adminApiFetch(
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

    closePostEditor({ force: true });
    resetPostPreview();

    await loadPosts(true);

    showToast({
      title: "Edytor",
      message: "Wpis został usunięty. Cloudflare opublikuje nową wersję strony.",
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    showToast({
      title: "Błąd usuwania wpisu",
      message: error instanceof Error
        ? error.message
        : "Nie udało się usunąć wpisu.",
      type: "error",
      duration: 5000,
    });
  } finally {
    deletePostButton.disabled = selectedPost === null;
    deletePostButton.textContent = "Usuń";
  }
});

cancelEditButton.addEventListener("click", () => {
  closePostEditor();
});

window.addEventListener("beforeunload", (event) => {
  if (!hasUnsavedEditorChanges()) {
    return;
  }

  event.preventDefault();
  event.returnValue = "";
});

function scheduleEditorAutosave() {
  window.clearTimeout(editorAutosaveTimeout);

  if (!hasActiveEditorSession()) {
    return;
  }

  editorAutosaveTimeout = window.setTimeout(() => {
    saveEditorDraft();
  }, EDITOR_AUTOSAVE_INTERVAL_MS);
}

function setEditorSaveStatus(state, label) {
  if (!editorSaveStatus) return;
  const icons = { saved: "check", editing: "circle", draft: "cloud-arrow-up", saving: "spinner fa-spin", error: "triangle-exclamation" };
  editorSaveStatus.className = `editor-save-status is-${state}`;
  editorSaveStatus.innerHTML = `<i class="fa-solid fa-${icons[state] || "circle"}"></i> ${label}`;
}

function resetEditorHistory() {
  editorHistory = [editorBody.value];
  editorHistoryIndex = 0;
  updateEditorHistoryButtons();
}

function rememberEditorHistory(value = editorBody.value) {
  if (applyingEditorHistory || editorHistory[editorHistoryIndex] === value) return;
  editorHistory = editorHistory.slice(0, editorHistoryIndex + 1);
  editorHistory.push(value);
  if (editorHistory.length > 100) editorHistory.shift();
  editorHistoryIndex = editorHistory.length - 1;
  updateEditorHistoryButtons();
}

function updateEditorHistoryButtons() {
  editorHistoryButtons.forEach((button) => {
    button.disabled = button.dataset.editorHistory === "undo"
      ? editorHistoryIndex <= 0
      : editorHistoryIndex >= editorHistory.length - 1;
  });
}

function moveEditorHistory(direction) {
  const nextIndex = editorHistoryIndex + (direction === "undo" ? -1 : 1);
  if (nextIndex < 0 || nextIndex >= editorHistory.length) return;
  applyingEditorHistory = true;
  editorHistoryIndex = nextIndex;
  editorBody.value = editorHistory[editorHistoryIndex];
  editorBody.dispatchEvent(new Event("input", { bubbles: true }));
  applyingEditorHistory = false;
  updateEditorHistoryButtons();
  editorBody.focus();
}

function openEditorFind() {
  if (!editorFindBar) return;
  editorFindBar.hidden = false;
  editorFindInput?.focus();
  editorFindInput?.select();
  refreshEditorFindMatches();
}

function closeEditorFind() {
  if (editorFindBar) editorFindBar.hidden = true;
  editorFindMatches = [];
  editorFindIndex = -1;
  editorBody.focus();
}

function refreshEditorFindMatches() {
  const query = String(editorFindInput?.value || "");
  editorFindMatches = [];
  editorFindIndex = -1;
  if (query) {
    const source = editorBody.value.toLocaleLowerCase("pl");
    const needle = query.toLocaleLowerCase("pl");
    let position = 0;
    while ((position = source.indexOf(needle, position)) !== -1) {
      editorFindMatches.push({ start: position, end: position + query.length });
      position += Math.max(1, query.length);
    }
  }
  if (editorFindCount) editorFindCount.textContent = `${editorFindMatches.length} ${editorFindMatches.length === 1 ? "wynik" : "wyników"}`;
  if (editorFindMatches.length) moveEditorFind(1);
}

function moveEditorFind(direction) {
  if (!editorFindMatches.length) return;
  editorFindIndex = (editorFindIndex + direction + editorFindMatches.length) % editorFindMatches.length;
  const match = editorFindMatches[editorFindIndex];
  editorBody.focus();
  editorBody.setSelectionRange(match.start, match.end);
  const lineHeight = Number.parseFloat(getComputedStyle(editorBody).lineHeight) || 24;
  const line = editorBody.value.slice(0, match.start).split("\n").length - 1;
  editorBody.scrollTop = Math.max(0, line * lineHeight - editorBody.clientHeight / 2);
  if (editorFindCount) editorFindCount.textContent = `${editorFindIndex + 1} z ${editorFindMatches.length}`;
}

function replaceCurrentEditorMatch() {
  if (editorFindIndex < 0 || !editorFindMatches.length) return;
  const match = editorFindMatches[editorFindIndex];
  editorBody.setRangeText(editorReplaceInput?.value || "", match.start, match.end, "end");
  editorBody.dispatchEvent(new Event("input", { bubbles: true }));
  refreshEditorFindMatches();
}

function replaceAllEditorMatches() {
  const query = String(editorFindInput?.value || "");
  if (!query || !editorFindMatches.length) return;
  const replacement = editorReplaceInput?.value || "";
  let nextValue = editorBody.value;
  [...editorFindMatches].reverse().forEach(({ start, end }) => {
    nextValue = `${nextValue.slice(0, start)}${replacement}${nextValue.slice(end)}`;
  });
  editorBody.value = nextValue;
  editorBody.dispatchEvent(new Event("input", { bubbles: true }));
  refreshEditorFindMatches();
}

[editorTitle, editorSlug, editorDate, editorLayout, editorTags, editorBody, ...editorSeoFields].forEach(
  (field) => {
    field.addEventListener("input", scheduleEditorAutosave);
    field.addEventListener("change", scheduleEditorAutosave);
    field.addEventListener("input", () => setEditorSaveStatus("editing", "Niezapisane zmiany"));
  }
);

function refreshSeoToolkitOnly() {
  updateQualityToolkit(editorBody.value || "");
}

editorSeoFields.forEach((field) => field?.addEventListener("input", refreshSeoToolkitOnly));
editorSeoFields.forEach((field) => field?.addEventListener("change", refreshSeoToolkitOnly));

editorTags.addEventListener("input", () => {
  window.clearTimeout(editorTagsDraftTimeout);
  editorTagsDraftTimeout = window.setTimeout(saveEditorDraft, 500);
});

editorBody.addEventListener("input", () => rememberEditorHistory());
editorHistoryButtons.forEach((button) => button.addEventListener("click", () => moveEditorHistory(button.dataset.editorHistory)));
previewDeviceButtons.forEach((button) => button.addEventListener("click", () => {
  const device = button.dataset.previewDevice;
  document.querySelector(".markdown-preview-column")?.setAttribute("data-preview-device", device);
  previewDeviceButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
}));
sourceActionButtons.forEach((button) => button.addEventListener("click", () => applySourceAction(button.dataset.sourceAction)));
editorViewButtons.forEach((button) => button.addEventListener("click", () => {
  const mode = button.dataset.editorView || "split";
  const workspace = document.querySelector(".markdown-workspace");
  workspace?.classList.remove("view-source", "view-preview");
  if (mode !== "split") workspace?.classList.add(`view-${mode}`);
  editorViewButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
}));
editorFindButton?.addEventListener("click", openEditorFind);
editorFindClose?.addEventListener("click", closeEditorFind);
editorFindInput?.addEventListener("input", refreshEditorFindMatches);
editorFindNext?.addEventListener("click", () => moveEditorFind(1));
editorFindPrevious?.addEventListener("click", () => moveEditorFind(-1));
editorReplaceOne?.addEventListener("click", replaceCurrentEditorMatch);
editorReplaceAll?.addEventListener("click", replaceAllEditorMatches);
editorOutline?.addEventListener("change", () => {
  const position = Number(editorOutline.value);
  if (!Number.isFinite(position)) return;
  editorBody.focus();
  editorBody.setSelectionRange(position, position);
  const lineHeight = Number.parseFloat(getComputedStyle(editorBody).lineHeight) || 24;
  const line = editorBody.value.slice(0, position).split("\n").length - 1;
  editorBody.scrollTop = Math.max(0, line * lineHeight - editorBody.clientHeight / 3);
});

savePostButton.addEventListener("click", async () => {

  if (editorContentType === "page") {
    await savePage();
    return;
  }

  if (!confirmSeoBeforeSave()) return;

  if (isCreatingNewPost) {

    savePostButton.disabled = true;
    savePostButton.textContent = "Tworzenie...";

    try {

      const response = await adminApiFetch(
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
            tags: parsePostTags(editorTags.value),
            body: getPostBodyForSave(),
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

      clearEditorDraft();

      await loadPosts(true);

      closePostEditor({ force: true });

      showToast({
        title: "Edytor",
        message: "Nowy wpis został utworzony.",
        type: "success",
        duration: 3000,
      });

    } catch (error) {

      showToast({
        title: "Błąd tworzenia wpisu",
        message: error instanceof Error
          ? error.message
          : "Nie udało się utworzyć wpisu.",
        type: "error",
        duration: 5000,
      });

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
    showToast({
      title: "Edytor",
      message: "Wpisz tytuł wpisu.",
      type: "error",
      duration: 5000,
    });

    editorTitle.focus();
    return;
  }

  if (!date) {
    showToast({
      title: "Edytor",
      message: "Wpisz datę wpisu.",
      type: "error",
      duration: 5000,
    });

    editorDate.focus();
    return;
  }

  if (!layout) {
    showToast({
      title: "Edytor",
      message: "Wpisz nazwę layoutu.",
      type: "error",
      duration: 5000,
    });

    editorLayout.focus();
    return;
  }

  let jekyllDate;

  try {
    jekyllDate = editorDateToJekyll(date);
  } catch (error) {
    showToast({
      title: "Nieprawidłowa data",
      message: error instanceof Error
        ? error.message
        : "Data ma nieprawidłowy format.",
      type: "error",
      duration: 5000,
    });

    editorDate.focus();
    return;
  }

  savePostButton.disabled = true;
  savePostButton.textContent = "Zapisywanie...";

  try {
    const response = await adminApiFetch(
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
          tags: parsePostTags(editorTags.value),
          body: getPostBodyForSave(),
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

    clearEditorDraft();

    await loadPosts(true);

    closePostEditor({ force: true });

    showToast({
      title: "Edytor",
      message: "Wpis został zapisany. Cloudflare rozpocznie publikację nowej wersji.",
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    showToast({
      title: "Błąd zapisu wpisu",
      message: error instanceof Error
        ? error.message
        : "Nie udało się zapisać wpisu.",
      type: "error",
      duration: 5000,
    });
  } finally {
    savePostButton.disabled = false;
    savePostButton.textContent = "Zapisz";
  }
});

editorTitle.addEventListener("input", () => {
  if (editorContentType === "post" && !slugEditedManually) {
    editorSlug.value = createSlug(editorTitle.value);
  }

  renderMarkdownPreview();
});

editorSlug.addEventListener("input", () => {
  slugEditedManually = true;
  editorSlug.value = createSlugWhileTyping(editorSlug.value);
});

editorBody.addEventListener("input", () => {
  updateSourceHighlight();
  renderMarkdownPreview();
});

editorBody.addEventListener("scroll", () => {
  if (!editorHighlight) return;
  editorHighlight.scrollTop = editorBody.scrollTop;
  editorHighlight.scrollLeft = editorBody.scrollLeft;
  if (editorLineNumbers) editorLineNumbers.scrollTop = editorBody.scrollTop;
});

editorBody.addEventListener("keydown", (event) => {

  if (event.key === ">" && editorContentType === "page") {
    const cursor = editorBody.selectionStart;
    const sourceBeforeCursor = editorBody.value.slice(0, cursor);
    const openingTag = sourceBeforeCursor.match(/<([a-z][\w:-]*)(?:\s[^<>]*)?$/i);
    const voidTags = new Set([
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "link", "meta", "param", "source", "track", "wbr"
    ]);

    if (
      openingTag &&
      !sourceBeforeCursor.endsWith("/") &&
      !voidTags.has(openingTag[1].toLowerCase())
    ) {
      event.preventDefault();
      const closingTag = `</${openingTag[1]}>`;
      editorBody.setRangeText(`>${closingTag}`, cursor, cursor, "end");
      editorBody.setSelectionRange(cursor + 1, cursor + 1);
      editorBody.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }
  }

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
    suspendEditorForMedia();
    openView("media");
    loadMedia();
  }
);

editorFullscreenButton?.addEventListener("click", () => {
  const fullscreen = editorPanel.classList.toggle("is-fullscreen");
  editorFullscreenButton.innerHTML = fullscreen
    ? '<i class="fa-solid fa-compress"></i>'
    : '<i class="fa-solid fa-expand"></i>';
  editorFullscreenButton.title = fullscreen ? "Wyjdź z pełnego ekranu" : "Pełny ekran";
});

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

      showToast({
        title: "Biblioteka mediów",
        message: "Obraz został dodany do GitHuba i wstawiony do treści.",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      showToast({
        title: "Błąd wysyłania obrazu",
        message: error instanceof Error
          ? error.message
          : "Nie udało się wysłać obrazu.",
        type: "error",
        duration: 5000,
      });
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

  const imageMarkup = editorContentType === "page"
    ? markdownImageToHtml(url, safeAltText)
    : `![${safeAltText}](${url})`;

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
    `${before}${imageMarkup}${after}`;

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

restoreStoredAdminSession();
if (adminSecret) restoreSession();

/* =========================================================
   LOGOWANIE I DASHBOARD
   ========================================================= */

async function restoreSession() {
  setConnectionState("loading");

  if (isAdminSessionExpired()) {
    expireAdminSession("Sesja wygasła. Zaloguj się ponownie.");
    return;
  }

  if (!(await refreshAdminSessionIfNeeded())) return;

  const success = await loadDashboardData();

  if (!success) {
    clearAdminSession();
    return;
  }

  loginScreen.hidden = true;
  adminApp.hidden = false;

  openView("dashboard");
  startAdminSessionMonitoring();
}

function restoreStoredAdminSession() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) || "null");
    if (stored?.accessToken) {
      adminSecret = stored.accessToken;
      adminRefreshToken = stored.refreshToken || "";
      adminSessionExpiresAt = Number(stored.expiresAt) || 0;
      adminSessionStartedAt = Number(stored.startedAt) || Date.now();
      adminSessionLastActivityAt = Number(stored.lastActivityAt) || Date.now();
      adminSessionLegacy = stored.legacy === true;
      return;
    }
  } catch {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  }

  const legacySecret = sessionStorage.getItem("mpzPanelAdminSecret") || "";
  if (legacySecret) {
    adminSecret = legacySecret;
    adminSessionLegacy = true;
    adminSessionStartedAt = Date.now();
    adminSessionLastActivityAt = Date.now();
    adminSessionExpiresAt = Date.now() + ADMIN_SESSION_IDLE_MS;
    sessionStorage.removeItem("mpzPanelAdminSecret");
    persistAdminSession();
  }
}

async function createAdminSession(secret) {
  try {
    const response = await fetch(ADMIN_SESSION_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}` },
    });

    if (response.status === 404 || response.status === 405 || response.status === 501) {
      setLegacyAdminSession(secret);
      return true;
    }

    const result = await response.json().catch(() => null);
    if (response.ok && (!result?.accessToken || !result?.refreshToken)) {
      setLegacyAdminSession(secret);
      return true;
    }
    if (!response.ok || !result?.accessToken || !result?.refreshToken) {
      throw new Error(result?.message || "Nie udało się utworzyć bezpiecznej sesji.");
    }

    const now = Date.now();
    adminSecret = result.accessToken;
    adminRefreshToken = result.refreshToken;
    adminSessionExpiresAt = now + Math.max(60, Number(result.expiresIn) || 900) * 1000;
    adminSessionStartedAt = now;
    adminSessionLastActivityAt = now;
    adminSessionLegacy = false;
    persistAdminSession();
    return true;
  } catch (error) {
    if (error instanceof TypeError) {
      setLegacyAdminSession(secret);
      return true;
    }
    showMessage(loginMessage, error instanceof Error ? error.message : "Logowanie nie powiodło się.", "error");
    return false;
  }
}

function setLegacyAdminSession(secret) {
  const now = Date.now();
  adminSecret = secret;
  adminRefreshToken = "";
  adminSessionExpiresAt = now + ADMIN_SESSION_IDLE_MS;
  adminSessionStartedAt = now;
  adminSessionLastActivityAt = now;
  adminSessionLegacy = true;
  persistAdminSession();
}

async function refreshAdminSessionIfNeeded(force = false) {
  if (adminSessionLegacy || !adminRefreshToken) return true;
  if (!force && adminSessionExpiresAt - Date.now() > ADMIN_SESSION_REFRESH_MARGIN_MS) return true;

  try {
    const response = await fetch(ADMIN_SESSION_REFRESH_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: adminRefreshToken }),
    });
    const result = await response.json();
    if (!response.ok || !result.accessToken) throw new Error(result.message || "Sesja wygasła.");
    adminSecret = result.accessToken;
    if (result.refreshToken) adminRefreshToken = result.refreshToken;
    adminSessionExpiresAt = Date.now() + Math.max(60, Number(result.expiresIn) || 900) * 1000;
    persistAdminSession();
    return true;
  } catch {
    expireAdminSession("Nie udało się odświeżyć sesji. Zaloguj się ponownie.");
    return false;
  }
}

async function adminApiFetch(input, options = {}) {
  if (isAdminSessionExpired()) {
    expireAdminSession("Sesja wygasła. Zaloguj się ponownie.");
    throw new Error("Sesja administratora wygasła.");
  }
  if (!(await refreshAdminSessionIfNeeded())) {
    throw new Error("Nie udało się odświeżyć sesji administratora.");
  }

  const createOptions = () => {
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${adminSecret}`);
    return { ...options, headers };
  };

  let response = await fetch(input, createOptions());
  if (response.status === 401 && !adminSessionLegacy && await refreshAdminSessionIfNeeded(true)) {
    response = await fetch(input, createOptions());
  }
  if (response.status === 401) {
    expireAdminSession("Sesja utraciła ważność. Zaloguj się ponownie.");
  }
  return response;
}

function persistAdminSession() {
  if (!adminSecret) return;
  sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify({
    accessToken: adminSecret,
    refreshToken: adminRefreshToken,
    expiresAt: adminSessionExpiresAt,
    startedAt: adminSessionStartedAt,
    lastActivityAt: adminSessionLastActivityAt,
    legacy: adminSessionLegacy,
  }));
}

function clearAdminSession() {
  adminSecret = "";
  adminRefreshToken = "";
  adminSessionExpiresAt = 0;
  adminSessionStartedAt = 0;
  adminSessionLastActivityAt = 0;
  adminSessionLegacy = false;
  if (adminSessionTimer) window.clearInterval(adminSessionTimer);
  adminSessionTimer = null;
  sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  sessionStorage.removeItem("mpzPanelAdminSecret");
}

function isAdminSessionExpired() {
  const now = Date.now();
  return !adminSecret || now - adminSessionLastActivityAt >= ADMIN_SESSION_IDLE_MS || now - adminSessionStartedAt >= ADMIN_SESSION_MAX_MS;
}

function recordAdminActivity() {
  if (!adminSecret || Date.now() - adminSessionLastActivityAt < 15000) return;
  adminSessionLastActivityAt = Date.now();
  if (adminSessionLegacy) adminSessionExpiresAt = adminSessionLastActivityAt + ADMIN_SESSION_IDLE_MS;
  persistAdminSession();
  void refreshAdminSessionIfNeeded();
}

function startAdminSessionMonitoring() {
  if (adminSessionTimer) window.clearInterval(adminSessionTimer);
  adminSessionTimer = window.setInterval(async () => {
    if (isAdminSessionExpired()) {
      expireAdminSession("Sesja wygasła z powodu braku aktywności. Zaloguj się ponownie.");
      return;
    }
    await refreshAdminSessionIfNeeded();
  }, 30000);
}

function expireAdminSession(message) {
  clearAdminSession();
  adminApp.hidden = true;
  loginScreen.hidden = false;
  secretInput.value = "";
  secretInput.focus();
  showMessage(loginMessage, message, "error");
}

["pointerdown", "keydown", "scroll"].forEach((eventName) => {
  document.addEventListener(eventName, recordAdminActivity, { passive: true });
});

async function loadDashboardData() {
  setConnectionState("loading");
  showToast({
    title: "Panel",
    message: "Pobieram dane...",
    type: "info",
    duration: 3000,
  });

  try {
    const response = await adminApiFetch(ADMIN_API_URL, {
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
    showToast({
      title: "Błąd połączenia",
      message,
      type: "error",
      duration: 5000,
    });

    return false;
  }
}

function renderData(data) {
  dashboardSummary = data;
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
  renderDashboardInsights();
}

/* =========================================================
   WIDOKI PANELU
   ========================================================= */

function openView(viewName) {

  if (!editorPanel.hidden) {
    if (viewName === "media") {
      suspendEditorForMedia();
    } else {
      if (!closePostEditor()) {
        return;
      }
    }
  }

  if (editorPanel.hidden && editorSuspendedForMedia && viewName !== "media") {
    const editorView = editorContentType === "page" ? "pages" : "posts";
    if (viewName === editorView) {
      editorOverlay.hidden = false;
      editorPanel.hidden = false;
      editorSuspendedForMedia = false;
    } else {
      if (!closePostEditor()) {
        return;
      }
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

  if (viewName === "pages" && !pagesLoaded) {
    loadPages();
  }

  if (viewName === "media" && !mediaLoaded) {
    loadMedia();
  }

  if (viewName === "dashboard") {
    loadDashboardContentOverview();
  }

  if (viewName === "newsletter") {
    loadNewsletterWorkspace();
  }

  if (viewName === "settings") {
    loadSettings();
  }

  window.location.hash = viewName;
}

async function loadDashboardContentOverview() {
  if (!dashboardRecentContent) return;
  dashboardRecentContent.innerHTML = '<p class="dashboard-empty">Pobieranie ostatnich treści…</p>';
  await Promise.all([loadPosts(), loadPages(), loadMedia()]);
  setText("dashboardPostsCount", posts.length);
  setText("dashboardPagesCount", pages.length);
  setText("dashboardPostsStat", posts.length);
  setText("dashboardPagesStat", pages.length);
  setText("dashboardImagesStat", mediaItems.length);

  const entries = posts.map((item) => ({ type: "post", item, title: item.title || item.name, date: item.updatedAt || item.date }))
    .sort((left, right) => (Date.parse(right.date || "") || 0) - (Date.parse(left.date || "") || 0)).slice(0, 5);

  dashboardRecentContent.innerHTML = "";
  if (!entries.length) {
    dashboardRecentContent.innerHTML = '<p class="dashboard-empty">Brak treści do wyświetlenia.</p>';
    return;
  }

  entries.forEach(({ type, item, title, date }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dashboard-recent-item";
    button.innerHTML = `<i class="fa-regular fa-${type === "page" ? "file-code" : "file-lines"}"></i><span><strong>${escapePreviewHtml(title || "Bez tytułu")}</strong><small>${type === "page" ? "Strona" : "Wpis"}${date ? ` · ${escapePreviewHtml(formatDate(date))}` : ""}</small></span><i class="fa-solid fa-chevron-right"></i>`;
    button.addEventListener("click", () => type === "page" ? openPageEditor(item) : openPostEditor(item));
    dashboardRecentContent.appendChild(button);
  });
  renderDashboardInsights();
}

function createDashboardMetric(label, value, maximum, detail) {
  const percentage = maximum > 0 ? Math.min(100, Math.max(0, Math.round((value / maximum) * 100))) : 0;
  return `<div class="dashboard-metric"><div><span>${escapePreviewHtml(label)}</span><strong>${escapePreviewHtml(detail ?? String(value))}</strong></div><div class="dashboard-metric-track" aria-hidden="true"><span style="width:${percentage}%"></span></div></div>`;
}

function renderDashboardInsights() {
  if (dashboardContentMetrics) {
    const maximum = Math.max(1, posts.length, pages.length, mediaItems.length);
    dashboardContentMetrics.innerHTML = [
      createDashboardMetric("Wpisy", posts.length, maximum),
      createDashboardMetric("Strony", pages.length, maximum),
      createDashboardMetric("Obrazy", mediaItems.length, maximum),
    ].join("");
  }

  if (dashboardNewsletterMetrics && dashboardSummary) {
    const { subscribers, deliveries } = dashboardSummary;
    const deliveryTotal = Number(deliveries.sent || 0) + Number(deliveries.failed || 0);
    const deliveryRate = deliveryTotal ? Math.round((Number(deliveries.sent || 0) / deliveryTotal) * 100) : 0;
    const subscriberTotal = Number(subscribers.total || 0);
    const activeRate = subscriberTotal ? Math.round((Number(subscribers.active || 0) / subscriberTotal) * 100) : 0;
    dashboardNewsletterMetrics.innerHTML = [
      createDashboardMetric("Dostarczalność", deliveryRate, 100, `${deliveryRate}%`),
      createDashboardMetric("Aktywni subskrybenci", activeRate, 100, `${activeRate}%`),
      createDashboardMetric("Oczekujące wysyłki", Number(deliveries.pending || 0), Math.max(1, deliveryTotal), String(deliveries.pending || 0)),
    ].join("");
  }
}

async function loadNewsletterWorkspace(forceRefresh = false) {
  if (newslettersLoaded && !forceRefresh) return;
  await loadPosts();
  newsletterPostSelect.innerHTML = '<option value="">Wybierz wpis…</option>';
  posts.forEach((post, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = post.title || post.name || "Bez tytułu";
    newsletterPostSelect.appendChild(option);
  });
  updateNewsletterActions();
  renderNewsletterPreview();
  await loadNewsletterRecords();
  newslettersLoaded = true;
}

function getSelectedNewsletterPost() {
  const selectedValue = newsletterPostSelect?.value;
  if (selectedValue === undefined || selectedValue === "") return null;
  const index = Number(selectedValue);
  return Number.isInteger(index) && index >= 0 ? posts[index] : null;
}

function selectNewsletterPost() {
  const post = getSelectedNewsletterPost();
  if (!post) {
    updateNewsletterActions();
    renderNewsletterPreview();
    return;
  }
  newsletterSubject.value = post.title || post.name || "";
  newsletterExcerpt.value = "";
  newsletterImage.value = post.image || post.featuredImage || "";
  newsletterActionStatus.textContent = "";
  updateNewsletterActions();
  renderNewsletterPreview();
}

function updateNewsletterActions() {
  const hasPost = Boolean(getSelectedNewsletterPost());
  const hasContent = Boolean(newsletterSubject?.value.trim() && newsletterExcerpt?.value.trim());
  const hasTestEmail = Boolean(newsletterTestEmail?.value.trim() && newsletterTestEmail.checkValidity());
  if (newsletterSendButton) newsletterSendButton.disabled = !(hasPost && hasContent);
  if (newsletterTestButton) newsletterTestButton.disabled = !(hasPost && hasContent && hasTestEmail);
}

function getNewsletterPayload() {
  const post = getSelectedNewsletterPost();
  if (!post) return null;
  const slug = post.slug || String(post.name || "").replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const relativeUrl = post.url || `/_posts/${slug}/`;
  return {
    postId: post.path || post.name || slug,
    postTitle: newsletterSubject.value.trim(),
    postUrl: new URL(relativeUrl, "https://minimalistycznie.pages.dev").href,
    postExcerpt: newsletterExcerpt.value.trim(),
    postImage: newsletterImage.value.trim(),
  };
}

function buildNewsletterPreviewHtml() {
  const payload = getNewsletterPayload() || { postTitle: newsletterSubject?.value || "Tytuł newslettera", postExcerpt: newsletterExcerpt?.value || "Opis wiadomości pojawi się tutaj.", postUrl: "#", postImage: newsletterImage?.value || "" };
  const image = payload.postImage ? `<img src="${escapePreviewHtml(payload.postImage)}" alt="" style="width:100%;max-height:320px;object-fit:cover;border-radius:10px">` : "";
  return `<!doctype html><html lang="pl"><body style="margin:0;background:#f4f1eb;font-family:Arial,sans-serif;color:#191919"><main style="max-width:620px;margin:32px auto;background:#fff;padding:38px;border-radius:12px"><p style="font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#6b6862">Minimalistycznie Przez Życie</p>${image}<h1 style="font-family:Georgia,serif;font-size:32px">${escapePreviewHtml(payload.postTitle)}</h1><p style="font-size:17px;line-height:1.65;color:#4c4944">${escapePreviewHtml(payload.postExcerpt)}</p><a href="${escapePreviewHtml(payload.postUrl)}" style="display:inline-block;margin-top:14px;padding:13px 20px;background:#171717;color:#fff;text-decoration:none">Czytaj wpis</a><hr style="margin:34px 0;border:0;border-top:1px solid #ddd"><small style="color:#777">To jest podgląd wiadomości. Link wypisania zostanie dodany automatycznie.</small></main></body></html>`;
}

function renderNewsletterPreview() {
  const html = buildNewsletterPreviewHtml();
  if (newsletterPreviewFrame) newsletterPreviewFrame.srcdoc = html;
  const code = newsletterHtmlPreview?.querySelector("code");
  if (code) code.textContent = html;
}

function setNewsletterPreviewMode(mode) {
  const showHtml = mode === "html";
  newsletterPreviewFrame.hidden = showHtml;
  newsletterHtmlPreview.hidden = !showHtml;
  newsletterPreviewButtons.forEach((button) => button.classList.toggle("active", button.dataset.newsletterPreview === mode));
}

async function newsletterApi(url, body) {
  const response = await adminApiFetch(url, { method: body ? "POST" : "GET", headers: body ? { "Content-Type": "application/json" } : {}, ...(body ? { body: JSON.stringify(body) } : {}) });
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error(result.message || "Operacja newslettera nie powiodła się.");
  return result;
}

async function sendNewsletterTest() {
  const payload = getNewsletterPayload();
  const email = newsletterTestEmail.value.trim();
  if (!payload || !payload.postTitle || !payload.postExcerpt || !email || !newsletterTestEmail.checkValidity()) return showToast({ title: "Newsletter", message: "Uzupełnij wpis, tytuł, opis i prawidłowy adres e-mail.", type: "error" });
  newsletterTestButton.disabled = true;
  newsletterActionStatus.textContent = "Wysyłanie wiadomości testowej…";
  try {
    await newsletterApi(ADMIN_TEST_NEWSLETTER_API_URL, { ...payload, email });
    newsletterActionStatus.textContent = "Wiadomość testowa została wysłana.";
    showToast({ title: "Newsletter", message: "Wysłano wiadomość testową.", type: "success" });
    await loadNewsletterRecords();
  } catch (error) { newsletterActionStatus.textContent = error.message; showToast({ title: "Błąd wysyłki testowej", message: error.message, type: "error", duration: 5000 }); }
  finally { newsletterTestButton.disabled = false; }
}

async function sendNewsletterCampaign(resend = false, payloadOverride = null) {
  const payload = payloadOverride || getNewsletterPayload();
  if (!payload || !payload.postTitle || !payload.postExcerpt) return showToast({ title: "Newsletter", message: "Uzupełnij wpis, tytuł i opis.", type: "error" });
  if (!window.confirm(resend ? "Ponownie wysłać ten newsletter do aktywnych subskrybentów?" : "Wysłać newsletter do wszystkich aktywnych subskrybentów?")) return;
  newsletterSendButton.disabled = true;
  newsletterActionStatus.textContent = resend ? "Przygotowanie ponownej wysyłki…" : "Dodawanie wiadomości do kolejki…";
  try {
    const result = await newsletterApi(ADMIN_SEND_NEWSLETTER_API_URL, { ...payload, resend });
    newsletterActionStatus.textContent = "Newsletter wysłano pomyślnie.";
    showToast({ title: "Newsletter", message: "Newsletter wysłano pomyślnie.", type: "success", duration: 5000 });
    await loadNewsletterRecords();
    await loadDashboardData();
  } catch (error) { newsletterActionStatus.textContent = error.message; showToast({ title: "Błąd newslettera", message: error.message, type: "error", duration: 6000 }); }
  finally { updateNewsletterActions(); }
}

async function loadNewsletterRecords() {
  newsletterQueueList.innerHTML = '<p class="dashboard-empty">Pobieranie kolejki…</p>';
  newsletterHistoryList.innerHTML = '<p class="dashboard-empty">Pobieranie historii…</p>';
  try {
    const result = await newsletterApi(ADMIN_NEWSLETTERS_API_URL);
    globalSearchNewsletterHistory = result.history || [];
    renderNewsletterRecords(newsletterQueueList, result.queue || [], false);
    renderNewsletterRecords(newsletterHistoryList, result.history || [], true);
  } catch (error) {
    newsletterQueueList.innerHTML = `<p class="global-message error">${escapePreviewHtml(error.message)}</p>`;
    newsletterHistoryList.innerHTML = `<p class="global-message error">${escapePreviewHtml(error.message)}</p>`;
  }
}

/* =========================================================
   GLOBALNA WYSZUKIWARKA ADMINISTRATORA
   ========================================================= */

async function openGlobalSearch() {
  if (!globalSearchResults) return;
  globalSearchResults.hidden = false;
  globalSearchInput.setAttribute("aria-expanded", "true");
  if (!globalSearchLoaded) {
    globalSearchResults.innerHTML = '<p class="global-search-empty">Pobieranie danych…</p>';
    await loadGlobalSearchData();
  }
  renderGlobalSearchResults();
}

function closeGlobalSearch() {
  if (!globalSearchResults) return;
  globalSearchResults.hidden = true;
  globalSearchInput?.setAttribute("aria-expanded", "false");
  globalSearchActiveIndex = -1;
}

async function loadGlobalSearchData(forceRefresh = false) {
  if (globalSearchLoaded && !forceRefresh) return;
  const newsletterRequest = newsletterApi(ADMIN_NEWSLETTERS_API_URL).catch(() => ({ history: [] }));
  const subscribersRequest = newsletterApi(ADMIN_SUBSCRIBERS_API_URL).catch(() => ({ subscribers: [] }));
  const [, , , newsletterData, subscribersData] = await Promise.all([
    loadPosts(forceRefresh), loadPages(forceRefresh), loadMedia(forceRefresh), newsletterRequest, subscribersRequest,
  ]);
  globalSearchNewsletterHistory = newsletterData.history || [];
  globalSearchSubscribers = subscribersData.subscribers || [];
  globalSearchLoaded = true;
}

function getGlobalSearchResults(query) {
  const normalizedQuery = normalizeGlobalSearchText(query);
  if (normalizedQuery.length < 2) return [];
  const matches = (...values) => normalizeGlobalSearchText(values.filter(Boolean).join(" ")).includes(normalizedQuery);
  const results = [];
  posts.filter((post) => matches(post.title, post.name, post.path, post.excerpt, getPostTags(post).join(" "))).slice(0, 8)
    .forEach((post) => results.push({ type: "post", group: "Wpisy", icon: "fa-file-lines", title: post.title || post.name, detail: `${formatDate(post.date)} · ${post.path}`, data: post }));
  pages.filter((page) => matches(page.title, page.name, page.path, page.excerpt)).slice(0, 8)
    .forEach((page) => results.push({ type: "page", group: "Strony", icon: "fa-file", title: page.title || page.name, detail: page.path, data: page }));
  mediaItems.filter((item) => matches(item.name, item.path, item.type)).slice(0, 8)
    .forEach((item) => results.push({ type: "media", group: "Media", icon: "fa-image", title: item.name || "Obraz", detail: item.path, data: item }));
  globalSearchNewsletterHistory.filter((item) => matches(item.postTitle, item.postId, item.postUrl, item.testEmail)).slice(0, 8)
    .forEach((item) => results.push({ type: "newsletter", group: "Newsletter", icon: "fa-envelope", title: item.postTitle || "Newsletter", detail: item.isTest ? `Test · ${item.testEmail}` : `${formatDate(item.sentAt)} · ${item.recipientsCount || 0} odbiorców`, data: item }));
  globalSearchSubscribers.filter((item) => matches(item.email, item.status)).slice(0, 8)
    .forEach((item) => results.push({ type: "subscriber", group: "Subskrybenci", icon: "fa-user", title: item.email, detail: `${formatSubscriberStatus(item.status)} · ${formatDate(item.createdAt)}`, data: item }));
  return results;
}

function normalizeGlobalSearchText(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");
}

function formatSubscriberStatus(status) {
  return ({ active: "Aktywny", pending: "Oczekujący", unsubscribed: "Wypisany" })[status] || status || "Brak statusu";
}

function renderGlobalSearchResults() {
  if (!globalSearchResults || globalSearchResults.hidden) return;
  const query = globalSearchInput.value.trim();
  globalSearchResults.innerHTML = "";
  globalSearchActiveIndex = -1;
  if (query.length < 2) {
    globalSearchResults.innerHTML = '<p class="global-search-empty">Wpisz co najmniej 2 znaki.</p>';
    return;
  }
  if (!globalSearchLoaded) {
    globalSearchResults.innerHTML = '<p class="global-search-empty">Pobieranie danych…</p>';
    return;
  }
  const results = getGlobalSearchResults(query);
  if (!results.length) {
    globalSearchResults.innerHTML = '<p class="global-search-empty">Brak wyników we wszystkich sekcjach.</p>';
    return;
  }
  let previousGroup = "";
  results.forEach((result) => {
    if (result.group !== previousGroup) {
      const heading = document.createElement("p");
      heading.className = "global-search-group";
      heading.textContent = result.group;
      globalSearchResults.appendChild(heading);
      previousGroup = result.group;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "global-search-result";
    button.innerHTML = `<i class="fa-regular ${result.icon}"></i><span><strong></strong><small></small></span>`;
    button.querySelector("strong").textContent = result.title;
    button.querySelector("small").textContent = result.detail;
    button.addEventListener("click", () => activateGlobalSearchResult(result));
    globalSearchResults.appendChild(button);
  });
}

function handleGlobalSearchKeydown(event) {
  const buttons = [...globalSearchResults.querySelectorAll(".global-search-result")];
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!buttons.length) return;
    globalSearchActiveIndex = event.key === "ArrowDown"
      ? (globalSearchActiveIndex + 1) % buttons.length
      : (globalSearchActiveIndex - 1 + buttons.length) % buttons.length;
    buttons.forEach((button, index) => button.classList.toggle("is-active", index === globalSearchActiveIndex));
    buttons[globalSearchActiveIndex].scrollIntoView({ block: "nearest" });
  } else if (event.key === "Enter" && globalSearchActiveIndex >= 0) {
    event.preventDefault();
    buttons[globalSearchActiveIndex]?.click();
  }
}

async function activateGlobalSearchResult(result) {
  closeGlobalSearch();
  if (result.type === "post") {
    openView("posts");
    await loadPosts();
    const item = postsList.querySelector(`[data-post-path="${CSS.escape(result.data.path || "")}"]`);
    if (item) selectPost(result.data, item);
  } else if (result.type === "page") {
    openView("pages");
    await loadPages();
    const item = pagesList.querySelector(`[data-page-path="${CSS.escape(result.data.path || "")}"]`);
    selectPage(result.data, item);
  } else if (result.type === "media") {
    openView("media");
    await loadMedia();
    mediaSearchInput.value = result.data.name || "";
    renderMedia();
    const card = mediaGrid.querySelector(`[data-media-path="${CSS.escape(result.data.path || "")}"]`);
    if (card) selectMediaCard(card, result.data);
  } else if (result.type === "newsletter") {
    openView("newsletter");
  } else if (result.type === "subscriber") {
    openView("newsletter");
    showToast({ title: "Subskrybent", message: `${result.data.email} · ${formatSubscriberStatus(result.data.status)}`, type: "info", duration: 5000 });
  }
}

/* =========================================================
   BACKUP
   ========================================================= */

function getBackupTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function triggerBlobDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function fetchBackupBlob(type) {
  const response = await adminApiFetch(`${ADMIN_BACKUP_API_URL}?type=${encodeURIComponent(type)}`, {
    headers: { Authorization: `Bearer ${adminSecret}` },
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || `Nie udało się przygotować eksportu ${type}.`);
  }
  return response.blob();
}

function downloadRepositoryBackup() {
  const link = document.createElement("a");
  link.href = "https://github.com/Dasqez/blog/archive/refs/heads/main.zip";
  link.download = `blog-repository-${getBackupTimestamp()}.zip`;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function createSettingsBackup() {
  const publicSettings = currentSiteSettings || collectSettingsForm();
  return new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), site: publicSettings, note: "Eksport celowo nie zawiera sekretów, tokenów ani klucza administratora." }, null, 2)], { type: "application/json;charset=utf-8" });
}

/* =========================================================
   USTAWIENIA CMS
   ========================================================= */

function getDefaultSiteSettings() {
  return { name: "Minimalistycznie Przez Życie", slogan: "Małe przygody w wielkim świecie", url: "https://minimalistycznie.pages.dev", favicon: "/favicon.png", logo: "", theme: "light", visibility: { name: true, slogan: true, favicon: true, logo: true, social: { facebook: true, instagram: true, x: true, github: true } }, social: { facebook: "", instagram: "", x: "", github: "" }, googleAnalyticsId: "", giscus: { enabled: true, repo: "Dasqez/blog", repoId: "R_kgDOS4j9FQ", category: "General", categoryId: "DIC_kwDOS4j9Fc4C_GFg" }, newsletter: { enabled: true } };
}

async function settingsApi(method = "GET", body = null) {
  const response = await adminApiFetch(ADMIN_SETTINGS_API_URL, { method, headers: body ? { "Content-Type": "application/json" } : {}, ...(body ? { body: JSON.stringify(body) } : {}) });
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error(result.message || "Operacja ustawień nie powiodła się.");
  return result;
}

async function loadSettings(forceRefresh = false) {
  if (settingsLoaded && !forceRefresh) return;
  saveSettingsButton.disabled = true;
  settingsStatus.textContent = "Pobieranie ustawień…";
  try {
    const result = await settingsApi();
    currentSiteSettings = { ...getDefaultSiteSettings(), ...(result.settings || {}) };
    fillSettingsForm(currentSiteSettings);
    settingsLoaded = true;
    settingsStatus.textContent = "Ustawienia są aktualne.";
  } catch (error) {
    settingsStatus.textContent = error.message;
    showToast({ title: "Błąd ustawień", message: error.message, type: "error", duration: 6000 });
  } finally { saveSettingsButton.disabled = false; }
}

function fillSettingsForm(settings) {
  const defaults = getDefaultSiteSettings();
  const value = { ...defaults, ...settings, visibility: { ...defaults.visibility, ...settings.visibility, social: { ...defaults.visibility.social, ...settings.visibility?.social } }, social: { ...defaults.social, ...settings.social }, giscus: { ...defaults.giscus, ...settings.giscus }, newsletter: { ...defaults.newsletter, ...settings.newsletter } };
  settingsFields.name.value = value.name || ""; settingsFields.slogan.value = value.slogan || ""; settingsFields.url.value = value.url || ""; settingsFields.favicon.value = value.favicon || ""; settingsFields.logo.value = value.logo || ""; settingsFields.theme.value = value.theme || "light";
  settingsFields.nameVisible.checked = value.visibility.name !== false; settingsFields.sloganVisible.checked = value.visibility.slogan !== false; settingsFields.faviconVisible.checked = value.visibility.favicon !== false; settingsFields.logoVisible.checked = value.visibility.logo !== false;
  settingsFields.facebook.value = value.social.facebook || ""; settingsFields.instagram.value = value.social.instagram || ""; settingsFields.x.value = value.social.x || ""; settingsFields.github.value = value.social.github || ""; settingsFields.googleAnalyticsId.value = value.googleAnalyticsId || ""; settingsFields.newsletterEnabled.checked = value.newsletter.enabled !== false;
  settingsFields.facebookVisible.checked = value.visibility.social.facebook !== false; settingsFields.instagramVisible.checked = value.visibility.social.instagram !== false; settingsFields.xVisible.checked = value.visibility.social.x !== false; settingsFields.githubVisible.checked = value.visibility.social.github !== false;
  settingsFields.giscusEnabled.checked = value.giscus.enabled !== false; settingsFields.giscusRepo.value = value.giscus.repo || ""; settingsFields.giscusRepoId.value = value.giscus.repoId || ""; settingsFields.giscusCategory.value = value.giscus.category || ""; settingsFields.giscusCategoryId.value = value.giscus.categoryId || "";
  updateSettingsPreview();
}

function collectSettingsForm() {
  return { name: settingsFields.name?.value.trim() || "", slogan: settingsFields.slogan?.value.trim() || "", url: settingsFields.url?.value.trim().replace(/\/$/, "") || "", favicon: settingsFields.favicon?.value.trim() || "/favicon.png", logo: settingsFields.logo?.value.trim() || "", theme: settingsFields.theme?.value || "light", visibility: { name: Boolean(settingsFields.nameVisible?.checked), slogan: Boolean(settingsFields.sloganVisible?.checked), favicon: Boolean(settingsFields.faviconVisible?.checked), logo: Boolean(settingsFields.logoVisible?.checked), social: { facebook: Boolean(settingsFields.facebookVisible?.checked), instagram: Boolean(settingsFields.instagramVisible?.checked), x: Boolean(settingsFields.xVisible?.checked), github: Boolean(settingsFields.githubVisible?.checked) } }, social: { facebook: settingsFields.facebook?.value.trim() || "", instagram: settingsFields.instagram?.value.trim() || "", x: settingsFields.x?.value.trim() || "", github: settingsFields.github?.value.trim() || "" }, googleAnalyticsId: settingsFields.googleAnalyticsId?.value.trim() || "", giscus: { enabled: Boolean(settingsFields.giscusEnabled?.checked), repo: settingsFields.giscusRepo?.value.trim() || "", repoId: settingsFields.giscusRepoId?.value.trim() || "", category: settingsFields.giscusCategory?.value.trim() || "", categoryId: settingsFields.giscusCategoryId?.value.trim() || "" }, newsletter: { enabled: Boolean(settingsFields.newsletterEnabled?.checked) } };
}

function updateSettingsPreview() {
  if (!settingsForm) return;
  const settings = collectSettingsForm();
  settingsPreview.dataset.theme = settings.theme;
  settingsNamePreview.textContent = settings.name || "Nazwa bloga";
  settingsNamePreview.hidden = !settings.visibility.name;
  settingsSloganPreview.textContent = settings.slogan || "Slogan";
  settingsSloganPreview.hidden = !settings.visibility.slogan;
  [ [settingsLogoPreview, settings.logo, settings.visibility.logo], [settingsFaviconPreview, settings.favicon, settings.visibility.favicon] ].forEach(([image, source, visible]) => {
    if (!image) return;
    image.hidden = !source || !visible;
    if (source) { try { image.src = new URL(source, settings.url || window.location.origin).href; } catch { image.removeAttribute("src"); } }
  });
  Object.entries(settingsSocialPreviews).forEach(([network, icon]) => {
    if (icon) icon.hidden = !settings.social[network] || !settings.visibility.social[network];
  });
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    localStorage.setItem(LOCAL_SETTINGS_PREVIEW_KEY, JSON.stringify(settings));
  }
}

async function saveSettings() {
  if (!settingsForm.reportValidity()) return;
  const settings = collectSettingsForm();
  saveSettingsButton.disabled = true;
  settingsStatus.textContent = "Zapisywanie ustawień w repozytorium…";
  try {
    const result = await settingsApi("POST", { settings });
    currentSiteSettings = settings;
    settingsLoaded = true;
    settingsStatus.textContent = "Ustawienia zapisano. Cloudflare Pages rozpocznie publikację.";
    showToast({ title: "Ustawienia", message: result.message || "Ustawienia zostały zapisane.", type: "success", duration: 5000 });
  } catch (error) {
    settingsStatus.textContent = error.message;
    showToast({ title: "Błąd zapisu ustawień", message: error.message, type: "error", duration: 6000 });
  } finally { saveSettingsButton.disabled = false; }
}

/* =========================================================
   ETAP 11 — UX
   ========================================================= */

function applyPanelTheme(theme) {
  const normalized = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.panelTheme = normalized;
  localStorage.setItem(PANEL_THEME_STORAGE_KEY, normalized);
  if (panelThemeButton) {
    panelThemeButton.innerHTML = normalized === "dark" ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
    panelThemeButton.title = normalized === "dark" ? "Włącz jasny motyw panelu" : "Włącz ciemny motyw panelu";
  }
}

function togglePanelTheme() {
  applyPanelTheme(document.documentElement.dataset.panelTheme === "dark" ? "light" : "dark");
}

function openShortcutsDialog() {
  if (shortcutsDialog && !shortcutsDialog.open) shortcutsDialog.showModal();
}

function showLoadingSkeleton(container, count = 4) {
  if (!container) return;
  container.innerHTML = `<div class="skeleton-list" aria-label="Ładowanie danych">${Array.from({ length: count }, () => '<span class="skeleton-row" aria-hidden="true"></span>').join("")}</div>`;
}

function closeContentContextMenu() {
  if (contentContextMenu) contentContextMenu.hidden = true;
  contextMenuType = "";
}

function handleContentContextMenu(event) {
  const item = event.target.closest(".post-item");
  if (!item || !contentContextMenu || editorPanel && !editorPanel.hidden) return;
  event.preventDefault();
  item.click();
  contextMenuType = item.classList.contains("page-item") ? "page" : "post";
  const duplicate = contentContextMenu.querySelector('[data-context-action="duplicate"]');
  if (duplicate) duplicate.hidden = contextMenuType !== "page";
  contentContextMenu.hidden = false;
  const width = contentContextMenu.offsetWidth || 190;
  const height = contentContextMenu.offsetHeight || 180;
  contentContextMenu.style.left = `${Math.min(event.clientX, window.innerWidth - width - 10)}px`;
  contentContextMenu.style.top = `${Math.min(event.clientY, window.innerHeight - height - 10)}px`;
  contentContextMenu.querySelector("button:not([hidden])")?.focus();
}

function handleContextMenuAction(event) {
  const action = event.target.closest("[data-context-action]")?.dataset.contextAction;
  if (!action || !contextMenuType) return;
  const controls = contextMenuType === "page"
    ? { edit: editPageButton, open: openPageButton, duplicate: duplicatePageButton, delete: deletePageButton }
    : { edit: editPostButton, open: openPostButton, delete: deletePostButton };
  closeContentContextMenu();
  controls[action]?.click();
}

function handleUxShortcuts(event) {
  const target = event.target;
  const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable;

  if (event.key === "Escape") closeContentContextMenu();
  if (typing && !(event.ctrlKey || event.metaKey) && event.key !== "Escape") return;

  if (event.key === "?" && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault(); openShortcutsDialog(); return;
  }
  if (event.shiftKey && event.key.toLowerCase() === "d") {
    event.preventDefault(); togglePanelTheme(); return;
  }
  if (event.altKey && /^[1-7]$/.test(event.key)) {
    event.preventDefault();
    const views = ["dashboard", "posts", "pages", "newsletter", "media", "backup", "settings"];
    openView(views[Number(event.key) - 1]); return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    if (!editorPanel.hidden) savePostButton?.click();
    else if (document.getElementById("view-settings")?.classList.contains("active-view")) saveSettingsButton?.click();
    return;
  }
  if (!typing && event.key.toLowerCase() === "n" && !event.ctrlKey && !event.metaKey && !event.altKey) {
    const activeView = document.querySelector(".panel-view.active-view")?.id;
    if (activeView === "view-posts") { event.preventDefault(); newPostButton?.click(); }
    if (activeView === "view-pages") { event.preventDefault(); newPageButton?.click(); }
  }
}

async function downloadBackup(type, button = null, silent = false) {
  const originalText = button?.innerHTML;
  if (button) { button.disabled = true; button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Przygotowanie…'; }
  try {
    const stamp = getBackupTimestamp();
    if (type === "repository") downloadRepositoryBackup();
    else if (type === "settings") triggerBlobDownload(createSettingsBackup(), `blog-settings-${stamp}.json`);
    else {
      const blob = await fetchBackupBlob(type);
      triggerBlobDownload(blob, type === "subscribers" ? `blog-subscribers-${stamp}.csv` : `blog-d1-${stamp}.json`);
    }
    if (!silent) showToast({ title: "Backup", message: "Plik kopii bezpieczeństwa został przygotowany.", type: "success" });
    return true;
  } catch (error) {
    if (!silent) showToast({ title: "Błąd backupu", message: error.message, type: "error", duration: 6000 });
    throw error;
  } finally {
    if (button) { button.disabled = false; button.innerHTML = originalText; }
  }
}

async function downloadAllBackups() {
  if (typeof JSZip === "undefined") {
    showToast({ title: "Backup", message: "Nie udało się załadować modułu tworzenia archiwum ZIP.", type: "error", duration: 6000 });
    return;
  }
  downloadAllBackupsButton.disabled = true;
  backupProgress.hidden = false;
  backupProgressBar.style.width = "0%";
  backupProgressValue.textContent = "0%";
  backupProgressTitle.textContent = "Pobieranie danych do archiwum";
  backupStatus.textContent = "Repozytorium, baza D1, subskrybenci i ustawienia…";
  try {
    const [repositoryBlob, databaseBlob, subscribersBlob] = await Promise.all([
      fetchBackupBlob("repository"),
      fetchBackupBlob("database"),
      fetchBackupBlob("subscribers"),
    ]);
    const zip = new JSZip();
    zip.file("repository.zip", repositoryBlob);
    zip.file("database-d1.json", databaseBlob);
    zip.file("subscribers.csv", subscribersBlob);
    zip.file("settings.json", createSettingsBackup());
    zip.file("README.txt", "Pakiet kopii bezpieczeństwa bloga. Wygenerowano: " + new Date().toISOString() + "\nPlik database-d1.json może zawierać dane osobowe i tokeny subskrypcji — przechowuj archiwum bezpiecznie.");
    backupProgressTitle.textContent = "Pakowanie archiwum ZIP";
    const archive = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } }, (metadata) => {
      const percent = Math.round(metadata.percent);
      backupProgressValue.textContent = `${percent}%`;
      backupProgressBar.style.width = `${percent}%`;
    });
    triggerBlobDownload(archive, `blog-backup-${getBackupTimestamp()}.zip`);
    backupProgressTitle.textContent = "Backup zakończony";
    backupProgressValue.textContent = "100%";
    backupProgressBar.style.width = "100%";
    backupStatus.textContent = "Pobrano jeden plik ZIP zawierający cztery kopie bezpieczeństwa.";
    showToast({ title: "Backup", message: "Pobrano pełny pakiet jako jeden plik ZIP.", type: "success", duration: 5000 });
  } catch (error) {
    backupProgressTitle.textContent = "Nie udało się utworzyć archiwum";
    backupStatus.textContent = error.message;
    showToast({ title: "Błąd backupu", message: error.message, type: "error", duration: 7000 });
  } finally {
    downloadAllBackupsButton.disabled = false;
  }
}

function renderNewsletterRecords(container, records, history) {
  container.innerHTML = "";
  if (!records.length) { container.innerHTML = `<p class="dashboard-empty">${history ? "Brak wysłanych newsletterów." : "Kolejka jest pusta."}</p>`; return; }
  records.forEach((record) => {
    const row = document.createElement("div");
    row.className = "newsletter-record";
    const historyDetails = record.isTest ? `Test · ${escapePreviewHtml(record.testEmail || "adres testowy")} · ${escapePreviewHtml(formatDate(record.sentAt))}` : `${escapePreviewHtml(formatDate(record.sentAt))} · ${Number(record.recipientsCount || 0)} odbiorców`;
    row.innerHTML = `<div><strong>${escapePreviewHtml(record.postTitle || record.postId || "Newsletter")}</strong><small>${history ? historyDetails : `${Number(record.pending || 0)} oczekujących · ${Number(record.failed || 0)} błędów`}</small></div>`;
    if (history && !record.isTest) {
      const button = document.createElement("button"); button.type = "button"; button.className = "secondary-button"; button.textContent = "Wyślij ponownie";
      button.addEventListener("click", () => sendNewsletterCampaign(true, { postId: record.postId, postTitle: record.postTitle, postUrl: record.postUrl, postExcerpt: "", postImage: "" }));
      row.appendChild(button);
    }
    container.appendChild(row);
  });
}

/* =========================================================
   LISTA WPISÓW
   ========================================================= */

async function loadPosts(forceRefresh = false) {
  if (postsLoaded && !forceRefresh) {
    return;
  }

  showLoadingSkeleton(postsList, 5);
  reloadPostsButton.disabled = true;

  try {
    const response = await adminApiFetch(
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

    await enrichPostsWithMetadata(posts);

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

async function enrichPostsWithMetadata(postItems) {
  await Promise.all(postItems.map(async (post) => {
    if (!post?.path || post.body || getPostTags(post).length) {
      return;
    }

    try {
      const response = await adminApiFetch(
        `${ADMIN_POST_API_URL}?path=${encodeURIComponent(post.path)}`,
        { headers: { Authorization: `Bearer ${adminSecret}` } }
      );
      const result = await response.json();

      if (response.ok && result.success === true && result.post) {
        post.body = result.post.body || "";
        post.tags = getPostTags(result.post);
      }
    } catch {
      // Lista pozostaje dostępna nawet, gdy szczegóły pojedynczego wpisu zawiodą.
    }
  }));
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
    item.dataset.postPath = post.path || "";

    const title = document.createElement("span");
    title.className = "post-title";
    title.textContent = post.title || post.name;

    const date = document.createElement("span");
    date.className = "post-date";
    date.textContent = formatDate(post.date);

    const meta = document.createElement("span");
    meta.className = "post-item-meta";
    const readingTime = getReadingTime(post.body || post.excerpt || "");
    const tags = getPostTags(post);
    meta.textContent = [
      `${readingTime} min czytania`,
      tags.length ? tags.map((tag) => `#${tag}`).join(" ") : "",
    ].filter(Boolean).join(" · ");

    item.append(title, date, meta);

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

  const tags = getPostTags(post);
  previewReadingTime.textContent =
    `${getReadingTime(post.body || post.excerpt || "")} min czytania`;
  previewTags.textContent = tags.map((tag) => `#${tag}`).join(" ");
  previewPostMeta.hidden = false;

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
  previewPostMeta.hidden = true;
  previewReadingTime.textContent = "";
  previewTags.textContent = "";
  previewExcerpt.textContent =
    "Po kliknięciu wpisu zobaczysz tutaj jego opis.";

  openPostButton.hidden = true;
  openPostButton.removeAttribute("href");

  editPostButton.disabled = true;
  deletePostButton.disabled = true;
}

/* =========================================================
   STRONY
   ========================================================= */

async function loadPages(forceRefresh = false) {
  if (pagesLoaded && !forceRefresh) return;

  showLoadingSkeleton(pagesList, 5);
  reloadPagesButton.disabled = true;

  try {
    const response = await adminApiFetch(ADMIN_PAGES_API_URL, {
      headers: { Authorization: `Bearer ${adminSecret}` },
    });
    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(result.message || "Nie udało się pobrać stron.");
    }

    pages = Array.isArray(result.pages) ? result.pages : [];
    const homePageIndex = pages.findIndex((page) => page.slug === "home");
    if (homePageIndex > 0) {
      pages.unshift(pages.splice(homePageIndex, 1)[0]);
    }
    pagesLoaded = true;

    if (selectedPage) {
      selectedPage = pages.find((page) => page.path === selectedPage.path) || null;
    }

    renderPages();
    if (!selectedPage) resetPagePreview();
  } catch (error) {
    pagesList.innerHTML = "";
    const message = document.createElement("p");
    message.className = "global-message error";
    message.textContent = error instanceof Error ? error.message : "Wystąpił nieznany błąd.";
    pagesList.appendChild(message);
  } finally {
    reloadPagesButton.disabled = false;
  }
}

function renderPages() {
  pagesList.innerHTML = "";

  if (pages.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Nie znaleziono żadnych stron.";
    pagesList.appendChild(empty);
    return;
  }

  pages.forEach((page, index) => {
    const row = document.createElement("div");
    row.className = "page-list-row";
    const item = document.createElement("button");
    item.type = "button";
    item.className = "post-item page-item";
    item.dataset.pagePath = page.path || "";

    const title = document.createElement("span");
    title.className = "post-title";
    title.textContent = page.title || page.name || page.path;

    const path = document.createElement("span");
    path.className = "post-date";
    path.textContent = page.path || "";

    item.append(title, path);
    item.addEventListener("click", () => selectPage(page, item));
    const controls = document.createElement("span");
    controls.className = "page-order-controls";
    [["up", "Przenieś wyżej", "fa-arrow-up"], ["down", "Przenieś niżej", "fa-arrow-down"]].forEach(([direction, label, icon]) => {
      const control = document.createElement("button");
      control.type = "button";
      control.title = label;
      control.setAttribute("aria-label", label);
      control.innerHTML = `<i class="fa-solid ${icon}"></i>`;
      const isHomePage = page.slug === "home";
      const wouldMoveAboveHome = direction === "up" && index === 1 && pages[0]?.slug === "home";
      control.disabled = isHomePage || wouldMoveAboveHome || (direction === "up" ? index === 0 : index === pages.length - 1);
      control.addEventListener("click", () => movePage(index, direction === "up" ? -1 : 1));
      controls.appendChild(control);
    });
    row.append(item, controls);
    pagesList.appendChild(row);

    if (selectedPage?.path === page.path) selectPage(page, item);
  });

  filterPages();
}

function filterPages() {
  const search = (pagesSearchInput?.value || "").trim().toLowerCase();
  pagesList?.querySelectorAll(".page-item").forEach((item) => {
    item.closest(".page-list-row").style.display = item.textContent.toLowerCase().includes(search) ? "" : "none";
  });
}

function selectPage(page, item) {
  selectedPage = page;
  pagesList.querySelectorAll(".page-item").forEach((element) => element.classList.remove("active"));
  item?.classList.add("active");

  pagePreviewTitle.textContent = page.title || page.name || "Strona";
  pagePreviewPath.textContent = page.path || "";
  pagePreviewExcerpt.textContent = page.excerpt || "Edytuj surową treść pliku strony.";

  const pageUrl = page.url || page.githubUrl;
  if (pageUrl) {
    openPageButton.href = pageUrl;
    openPageButton.hidden = false;
  } else {
    openPageButton.hidden = true;
    openPageButton.removeAttribute("href");
  }
  editPageButton.disabled = false;
  duplicatePageButton.disabled = false;
  deletePageButton.disabled = false;
  pageHistoryButton.disabled = false;
}

function resetPagePreview() {
  selectedPage = null;
  pagePreviewTitle.textContent = "Wybierz stronę";
  pagePreviewPath.textContent = "";
  pagePreviewExcerpt.textContent = "Po kliknięciu strony zobaczysz tutaj jej podstawowe informacje.";
  openPageButton.hidden = true;
  openPageButton.removeAttribute("href");
  editPageButton.disabled = true;
  duplicatePageButton.disabled = true;
  deletePageButton.disabled = true;
  pageHistoryButton.disabled = true;
}

async function callPageApi(url, body) {
  const response = await adminApiFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminSecret}` },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error(result.message || "Operacja na stronie nie powiodła się.");
  return result;
}

function createNewPage() {
  isCreatingNewPage = true;
  isCreatingNewPost = false;
  editedPost = null;
  editedPage = { path: "", sha: null };
  configureEditorForContentType("page");
  editorHeading.textContent = "Nowa strona";
  editorTitle.readOnly = false;
  editorSlugField.hidden = false;
  editorTitle.value = "";
  editorSlug.value = "";
  editorBody.value = "<section>\n  <h1>Nowa strona</h1>\n  <p>Treść strony.</p>\n</section>";
  setEditorBaseline();
  resetEditorHistory();
  renderMarkdownPreview();
  editorOverlay.hidden = false;
  editorPanel.hidden = false;
  savePostButton.disabled = false;
  savePostButton.textContent = "Utwórz stronę";
  editorTitle.focus();
}

async function duplicateSelectedPage() {
  if (!selectedPage) return;
  const slug = window.prompt("Slug kopii strony:", `${selectedPage.slug || "strona"}-kopia`);
  if (!slug) return;
  try {
    await callPageApi(ADMIN_DUPLICATE_PAGE_API_URL, { path: selectedPage.path, slug });
    pagesLoaded = false;
    await loadPages(true);
    showToast({ title: "Strony", message: "Utworzono kopię strony.", type: "success" });
  } catch (error) { showToast({ title: "Błąd duplikowania", message: error.message, type: "error", duration: 5000 }); }
}

async function deleteSelectedPage() {
  if (!selectedPage || !window.confirm(`Usunąć stronę „${selectedPage.title || selectedPage.name}”? Tej operacji nie można cofnąć w panelu.`)) return;
  try {
    await callPageApi(ADMIN_DELETE_PAGE_API_URL, { path: selectedPage.path, sha: selectedPage.sha });
    resetPagePreview();
    pagesLoaded = false;
    await loadPages(true);
    showToast({ title: "Strony", message: "Strona została usunięta.", type: "success" });
  } catch (error) { showToast({ title: "Błąd usuwania", message: error.message, type: "error", duration: 5000 }); }
}

async function movePage(index, offset) {
  const target = index + offset;
  if (target < 0 || target >= pages.length) return;
  if (pages[index]?.slug === "home" || pages[target]?.slug === "home") return;
  const previous = [...pages];
  [pages[index], pages[target]] = [pages[target], pages[index]];
  renderPages();
  try {
    await callPageApi(ADMIN_REORDER_PAGES_API_URL, { paths: pages.map((page) => page.path) });
    showToast({ title: "Strony", message: "Kolejność została zapisana.", type: "success" });
  } catch (error) {
    pages = previous;
    renderPages();
    showToast({ title: "Błąd kolejności", message: error.message, type: "error", duration: 5000 });
  }
}

async function openPageHistory() {
  if (!selectedPage) return;
  pageHistoryTitle.textContent = selectedPage.title || selectedPage.name;
  pageHistoryList.innerHTML = "<p>Ładowanie historii...</p>";
  pageHistoryDialog.showModal();
  try {
    const response = await adminApiFetch(`${ADMIN_PAGE_HISTORY_API_URL}?path=${encodeURIComponent(selectedPage.path)}`);
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error(result.message || "Nie udało się pobrać historii.");
    pageHistoryList.innerHTML = "";
    (result.versions || []).forEach((version, index) => {
      const row = document.createElement("div");
      row.className = "page-history-item";
      const info = document.createElement("div");
      info.innerHTML = `<strong>${escapePreviewHtml(version.message || "Wersja strony")}</strong><small>${escapePreviewHtml(formatDate(version.date))} · ${escapePreviewHtml(version.author || "GitHub")}</small>`;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = index === 0 ? "Aktualna" : "Przywróć";
      button.disabled = index === 0;
      button.addEventListener("click", () => rollbackPage(version.sha));
      row.append(info, button);
      pageHistoryList.appendChild(row);
    });
    if (!result.versions?.length) pageHistoryList.innerHTML = "<p>Brak zapisanych wersji.</p>";
  } catch (error) { pageHistoryList.innerHTML = `<p class="global-message error">${escapePreviewHtml(error.message)}</p>`; }
}

async function rollbackPage(commitSha) {
  if (!selectedPage || !window.confirm("Przywrócić tę wersję jako nowy zapis?")) return;
  try {
    await callPageApi(ADMIN_PAGE_ROLLBACK_API_URL, { path: selectedPage.path, commitSha });
    pageHistoryDialog.close();
    pagesLoaded = false;
    await loadPages(true);
    showToast({ title: "Historia", message: "Przywrócono wybraną wersję strony.", type: "success" });
  } catch (error) { showToast({ title: "Błąd przywracania", message: error.message, type: "error", duration: 5000 }); }
}

/* =========================================================
   EDYTOR ISTNIEJĄCEGO WPISU
   ========================================================= */

function configureEditorForContentType(type) {
  const isPage = type === "page";
  editorContentType = isPage ? "page" : "post";
  editorPanel.classList.toggle("editor-type-page", isPage);
  editorPanel.classList.toggle("editor-type-post", !isPage);
  editorHeading.textContent = isPage ? "Edycja strony" : "Edycja wpisu";
  editorTitle.readOnly = isPage && !isCreatingNewPage;
  editorTitle.setAttribute("aria-readonly", String(isPage));
  editorTitleField.hidden = false;
  editorSlugField.hidden = isPage && !isCreatingNewPage;
  editorDateField.hidden = isPage;
  editorLayoutField.hidden = isPage;
  editorTagsField.hidden = isPage;
  if (qualityToolkit) qualityToolkit.hidden = isPage;
  editorBody.wrap = isPage ? "off" : "soft";
  editorBody.spellcheck = !isPage;
  editorBody.placeholder = isPage ? "Edytuj kod HTML / Liquid strony…" : "Zacznij pisać treść wpisu…";
  if (editorFormatBadge) editorFormatBadge.textContent = isPage ? "Strona · HTML / Liquid" : "Wpis · Markdown";
  if (editorSourceLabel) editorSourceLabel.textContent = isPage ? "Kod HTML / Liquid" : "Tekst Markdown";
  document.querySelector(".markdown-toolbar")?.setAttribute("aria-label", isPage ? "Narzędzia HTML i Liquid" : "Narzędzia Markdown");
  markdownToolbarButtons.forEach((button) => { button.hidden = isPage; });
  sourceActionButtons.forEach((button) => { button.hidden = !isPage; });
}

async function openPageEditor(page) {
  isCreatingNewPage = false;
  savePostButton.disabled = true;
  savePostButton.textContent = "Pobieranie...";
  try {
    const response = await adminApiFetch(`${ADMIN_PAGE_API_URL}?path=${encodeURIComponent(page.path)}`, {
      headers: { Authorization: `Bearer ${adminSecret}` },
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || "Nie udało się pobrać strony.");
    }
    editedPage = result.page;
    editedPost = null;
    isCreatingNewPost = false;
    slugEditedManually = true;
    configureEditorForContentType("page");
    editorTitle.value = result.page.title || page.title || result.page.name || "Strona";
    editorSlug.value = "";
    editorDate.value = "";
    editorLayout.value = "";
    editorTags.value = "";
    editorBody.value = result.page.source ?? result.page.body ?? "";
    setEditorBaseline();
    restoreEditorDraft();
    resetEditorHistory();
    renderMarkdownPreview();
    editorOverlay.hidden = false;
    editorPanel.hidden = false;
    editorSuspendedForMedia = false;
    savePostButton.disabled = false;
    savePostButton.textContent = "Zapisz stronę";
    editorBody.focus();
  } catch (error) {
    showToast({ title: "Błąd pobierania strony", message: error instanceof Error ? error.message : "Nie udało się pobrać strony.", type: "error", duration: 5000 });
    savePostButton.disabled = false;
    savePostButton.textContent = "Zapisz";
  }
}

async function savePage() {
  if (!editedPage) return;
  savePostButton.disabled = true;
  savePostButton.textContent = "Zapisywanie...";
  try {
    const response = await adminApiFetch(isCreatingNewPage ? ADMIN_CREATE_PAGE_API_URL : ADMIN_UPDATE_PAGE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminSecret}` },
      body: JSON.stringify(isCreatingNewPage
        ? { title: editorTitle.value.trim(), slug: editorSlug.value.trim(), body: editorBody.value }
        : { path: editedPage.path, sha: editedPage.sha, body: editorBody.value }),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || "Nie udało się zapisać strony.");
    }
    if (result.page?.sha) {
      editedPage.sha = result.page.sha;
      if (selectedPage) selectedPage.sha = result.page.sha;
    }
    if (!isCreatingNewPage && pages.length) {
      await callPageApi(ADMIN_REORDER_PAGES_API_URL, { paths: pages.map((page) => page.path) });
    }
    pagesLoaded = false;
    isCreatingNewPage = false;
    clearEditorDraft();
    await loadPages(true);
    closePostEditor({ force: true });
    showToast({ title: "Edytor", message: "Strona została zapisana. Cloudflare rozpocznie publikację nowej wersji.", type: "success", duration: 3000 });
  } catch (error) {
    showToast({ title: "Błąd zapisu strony", message: error instanceof Error ? error.message : "Nie udało się zapisać strony.", type: "error", duration: 5000 });
  } finally {
    savePostButton.disabled = false;
    savePostButton.textContent = editorContentType === "page" ? "Zapisz stronę" : "Zapisz";
  }
}

async function openPostEditor(post) {
  configureEditorForContentType("post");
  editedPage = null;
  savePostButton.disabled = true;
  savePostButton.textContent = "Pobieranie...";

  try {
    const response = await adminApiFetch(
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

    editorTags.value = getPostTags(result.post).join(", ");

    setSeoEditorValues(extractPostSeoMetadata(result.post.body || ""));

    editorBody.value =
      stripPostMetadata(result.post.body || "");

    setEditorBaseline();
    restoreEditorDraft();
    resetEditorHistory();
    renderMarkdownPreview();

    editorOverlay.hidden = false;
    editorPanel.hidden = false;
    editorSuspendedForMedia = false;
    savePostButton.disabled = false;
    editorTitle.focus();

  } catch (error) {
    showToast({
      title: "Błąd pobierania wpisu",
      message: error instanceof Error
        ? error.message
        : "Nie udało się pobrać wpisu.",
      type: "error",
      duration: 5000,
    });
  } finally {
    savePostButton.textContent = "Zapisz";
  }
}

/* =========================================================
   NOWY WPIS
   ========================================================= */

function createNewPost() {
  configureEditorForContentType("post");
  editedPage = null;
  selectedPost = null;
  editedPost = null;

  isCreatingNewPost = true;
  slugEditedManually = false;

  editorTitle.value = "";
  editorSlug.value = "";
  editorDate.value =
    formatEditorDate(new Date());
  editorLayout.value = "post-layout.html";
  editorTags.value = "";
  setSeoEditorValues({});
  editorBody.value = "";
  setEditorBaseline();
  restoreEditorDraft();
  resetEditorHistory();
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
  previewPostMeta.hidden = true;
  previewExcerpt.textContent =
    "Wypełnij formularz, aby utworzyć nowy wpis.";

  openPostButton.hidden = true;
  editPostButton.disabled = true;
  deletePostButton.disabled = true;

  editorTitle.focus();
}

function closePostEditor(options = {}) {
  const force = options?.force === true;

  if (!force && hasUnsavedEditorChanges()) {
    const confirmed = window.confirm(
      "Masz niezapisane zmiany. Czy na pewno chcesz zamknąć edytor? Wersja robocza pozostanie zapisana w tej przeglądarce."
    );

    if (!confirmed) {
      return false;
    }

    saveEditorDraft();
  }

  editorOverlay.hidden = true;
  editorPanel.hidden = true;
  editorPanel.classList.remove("is-fullscreen");
  if (editorFullscreenButton) {
    editorFullscreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
    editorFullscreenButton.title = "Pełny ekran";
  }
  editorSuspendedForMedia = false;
  window.clearTimeout(editorAutosaveTimeout);
  window.clearTimeout(editorTagsDraftTimeout);

  editedPost = null;
  editedPage = null;
  isCreatingNewPage = false;
  configureEditorForContentType("post");
  isCreatingNewPost = false;
  slugEditedManually = false;

  editorTitle.value = "";
  editorSlug.value = "";
  editorDate.value = "";
  editorLayout.value = "";
  editorTags.value = "";
  setSeoEditorValues({});
  editorBody.value = "";
  editorBaseline = "";
  renderMarkdownPreview();

  savePostButton.disabled = true;
  savePostButton.textContent = "Zapisz";

  return true;
}

function hasActiveEditorSession() {
  return isCreatingNewPost || Boolean(editedPost) || Boolean(editedPage) || editorSuspendedForMedia;
}

function getEditorValues() {
  return {
    title: editorTitle.value,
    slug: editorSlug.value,
    date: editorDate.value,
    layout: editorLayout.value,
    tags: editorTags.value,
    seo: getSeoEditorValues(),
    body: editorBody.value,
  };
}

function serializeEditorValues() {
  return JSON.stringify(getEditorValues());
}

function setEditorBaseline() {
  editorBaseline = serializeEditorValues();
  setEditorSaveStatus("saved", "Zapisano");
}

function hasUnsavedEditorChanges() {
  return Boolean(
    hasActiveEditorSession() &&
    editorBaseline &&
    serializeEditorValues() !== editorBaseline
  );
}

function getCurrentEditorIdentity() {
  return {
    type: editorContentType,
    mode: isCreatingNewPost ? "new" : "existing",
    path: isCreatingNewPost ? null : (editorContentType === "page" ? editedPage?.path : editedPost?.path) || null,
  };
}

function readEditorDraft() {
  try {
    const storedDraft = localStorage.getItem(EDITOR_DRAFT_STORAGE_KEY);
    return storedDraft ? JSON.parse(storedDraft) : null;
  } catch (error) {
    console.warn("Nie udało się odczytać wersji roboczej.", error);
    return null;
  }
}

function saveEditorDraft() {
  if (!hasUnsavedEditorChanges()) {
    return false;
  }

  const identity = getCurrentEditorIdentity();
  const serializedValues = serializeEditorValues();

  if (serializedValues === lastSavedDraftValues) {
    return false;
  }

  try {
    localStorage.setItem(
      EDITOR_DRAFT_STORAGE_KEY,
      JSON.stringify({
        version: "0.9.1",
        savedAt: new Date().toISOString(),
        ...identity,
        ...getEditorValues(),
      })
    );
    lastSavedDraftValues = serializedValues;
    setEditorSaveStatus("draft", "Szkic zapisany lokalnie");
    showEditorDraftSavedToast();
    return true;
  } catch (error) {
    console.warn("Nie udało się zapisać wersji roboczej.", error);
    return false;
  }
}

function showEditorDraftSavedToast() {
  showToast({
    title: "💾 Wersja robocza",
    message: "Wersja robocza została zapisana.",
    type: "info",
    duration: EDITOR_AUTOSAVE_TOAST_DURATION_MS
  });
}

function clearEditorDraft() {
  try {
    const draft = readEditorDraft();
    const identity = getCurrentEditorIdentity();
    const belongsToCurrentEditor =
      !draft ||
      (draft.type === identity.type && draft.mode === identity.mode &&
        (identity.mode === "new" || draft.path === identity.path));

    if (!belongsToCurrentEditor) {
      return;
    }

    localStorage.removeItem(EDITOR_DRAFT_STORAGE_KEY);
    lastSavedDraftValues = "";
  } catch (error) {
    console.warn("Nie udało się usunąć wersji roboczej.", error);
  }
}

function restoreEditorDraft() {
  const draft = readEditorDraft();

  if (!draft) {
    return;
  }

  const identity = getCurrentEditorIdentity();
  const matchesCurrentEditor =
    draft.type === identity.type && draft.mode === identity.mode &&
    (identity.mode === "new" || draft.path === identity.path);

  if (!matchesCurrentEditor) {
    return;
  }

  const confirmed = window.confirm(
    "Znaleziono niezapisaną wersję roboczą. Przywrócić?"
  );

  if (!confirmed) {
    clearEditorDraft();
    return;
  }

  editorTitle.value = draft.title || "";
  editorSlug.value = draft.slug || "";
  editorDate.value = draft.date || "";
  editorLayout.value = draft.layout || (editorContentType === "post" ? "post-layout.html" : "");
  editorTags.value = draft.tags || "";
  setSeoEditorValues(draft.seo || {});
  editorBody.value = draft.body || "";
  slugEditedManually = editorContentType === "page" || Boolean(editorSlug.value);
  lastSavedDraftValues = serializeEditorValues();
  setEditorSaveStatus("draft", "Przywrócony szkic lokalny");
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

  openView(editorContentType === "page" ? "pages" : "posts");
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
  if (hasUnsavedEditorChanges()) {
    const confirmed = window.confirm(
      "Masz niezapisane zmiany. Czy na pewno chcesz się wylogować? Wersja robocza pozostanie zapisana w tej przeglądarce."
    );

    if (!confirmed) {
      return;
    }

    saveEditorDraft();
  }

  const accessToken = adminSecret;
  if (!adminSessionLegacy && accessToken) {
    fetch(ADMIN_SESSION_LOGOUT_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      keepalive: true,
    }).catch(() => {});
  }
  clearAdminSession();

  adminApp.hidden = true;
  loginScreen.hidden = false;

  secretInput.value = "";
  secretInput.focus();

  posts = [];
  selectedPost = null;
  editedPost = null;
  postsLoaded = false;
  isCreatingNewPost = false;

  closePostEditor({ force: true });
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
    case event.key.toLowerCase() === "h":
      event.preventDefault();
      openEditorFind();
      return;

    case event.key.toLowerCase() === "z" && !event.shiftKey:
      event.preventDefault();
      moveEditorHistory("undo");
      return;

    case (event.key.toLowerCase() === "z" && event.shiftKey) || event.key.toLowerCase() === "y":
      event.preventDefault();
      moveEditorHistory("redo");
      return;

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

/* =========================================================
   PODGLĄD LIQUID DLA STRON CMS

   Funkcje z tej sekcji pracują wyłącznie na kopii tekstu
   przekazanej do podglądu. Oryginalna wartość editorBody
   nie jest modyfikowana i nadal trafia do GitHuba 1:1.
   ========================================================= */

const LIQUID_PREVIEW_POSTS = [
  {
    url: "/_posts/przykladowy-wpis/",
    date: "2026-08-08T12:00:00.000Z",
    data: {
      title: "Przykładowy wpis",
      image: "/uploads/przykladowe-zdjecie.jpg",
      page: {
        excerpt: "To jest przykładowy opis wpisu używany wyłącznie w podglądzie strony."
      }
    }
  },
  {
    url: "/_posts/drugi-przykladowy-wpis/",
    date: "2026-08-01T12:00:00.000Z",
    data: {
      title: "Drugi przykładowy wpis",
      image: "",
      page: {
        excerpt: "Drugi przykładowy opis pokazuje działanie pętli Liquid."
      }
    }
  }
];

function getLiquidPreviewValue(expression, context) {
  const source = String(expression || "").trim();

  if (!source) return "";
  if ((source.startsWith('"') && source.endsWith('"')) ||
      (source.startsWith("'") && source.endsWith("'"))) {
    return source.slice(1, -1);
  }
  if (/^-?\d+(?:\.\d+)?$/.test(source)) return Number(source);
  if (source === "true") return true;
  if (source === "false") return false;
  if (source === "nil" || source === "null") return null;

  return source.split(".").reduce((value, key) => {
    if (value == null) return undefined;
    return value[key];
  }, context);
}

function liquidPreviewTruthy(value) {
  return value !== false && value != null && value !== "";
}

function evaluateLiquidPreviewCondition(expression, context) {
  const source = String(expression || "").trim();
  const orParts = source.split(/\s+or\s+/i);

  return orParts.some((orPart) =>
    orPart.split(/\s+and\s+/i).every((part) => {
      const condition = part.trim();
      if (/^not\s+/i.test(condition)) {
        return !evaluateLiquidPreviewCondition(condition.replace(/^not\s+/i, ""), context);
      }

      const comparison = condition.match(/^(.+?)\s+(contains|==|!=|>=|<=|>|<)\s+(.+)$/i);
      if (!comparison) return liquidPreviewTruthy(getLiquidPreviewValue(condition, context));

      const left = getLiquidPreviewValue(comparison[1], context);
      const right = getLiquidPreviewValue(comparison[3], context);
      switch (comparison[2].toLowerCase()) {
        case "contains": return String(left ?? "").includes(String(right ?? ""));
        case "==": return left == right;
        case "!=": return left != right;
        case ">=": return left >= right;
        case "<=": return left <= right;
        case ">": return left > right;
        case "<": return left < right;
        default: return false;
      }
    })
  );
}

function applyLiquidPreviewFilter(value, filterSource) {
  const [rawName, ...rawArguments] = String(filterSource).split(":");
  const name = rawName.trim().toLowerCase();
  const argument = rawArguments.join(":").trim().replace(/^['"]|['"]$/g, "");

  if (name === "escape") return escapePreviewHtml(value ?? "");
  if (name === "upcase") return String(value ?? "").toUpperCase();
  if (name === "downcase") return String(value ?? "").toLowerCase();
  if (name === "strip") return String(value ?? "").trim();
  if (name === "default") return liquidPreviewTruthy(value) ? value : argument;
  if (name === "date") {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value ?? "";
    const pad = (number) => String(number).padStart(2, "0");
    return argument
      .replace(/%d/g, pad(date.getDate()))
      .replace(/%m/g, pad(date.getMonth() + 1))
      .replace(/%Y/g, String(date.getFullYear()))
      .replace(/%y/g, String(date.getFullYear()).slice(-2));
  }
  if (name === "markdownify" && typeof marked !== "undefined") {
    return marked.parse(String(value ?? ""), { breaks: true, gfm: true });
  }

  return value ?? "";
}

function interpolateLiquidPreviewVariables(source, context) {
  return String(source).replace(/{{\s*([\s\S]*?)\s*}}/g, (_match, expression) => {
    const [path, ...filters] = expression.split("|");
    return filters.reduce(
      (value, filter) => applyLiquidPreviewFilter(value, filter),
      getLiquidPreviewValue(path, context)
    );
  });
}

function findLiquidPreviewBlock(source, startIndex, blockName) {
  const tagPattern = /{%\s*(for|endfor|if|endif|else)\b[\s\S]*?%}/g;
  tagPattern.lastIndex = startIndex;
  let depth = 1;
  let elseTag = null;
  let match;

  while ((match = tagPattern.exec(source))) {
    const tagName = match[1];
    if (tagName === "for" || tagName === "if") depth += 1;
    if (tagName === "endfor" || tagName === "endif") depth -= 1;
    if (tagName === "else" && depth === 1 && !elseTag) {
      elseTag = { index: match.index, end: tagPattern.lastIndex };
    }
    if (depth === 0 && tagName === `end${blockName}`) {
      return { endIndex: match.index, afterEnd: tagPattern.lastIndex, elseTag };
    }
  }

  return null;
}

function renderLiquidPreviewBlocks(source, context) {
  const openingTag = /{%\s*(for|if)\b([\s\S]*?)%}/g;
  const match = openingTag.exec(source);
  if (!match) return interpolateLiquidPreviewVariables(source, context);

  const blockName = match[1];
  const block = findLiquidPreviewBlock(source, openingTag.lastIndex, blockName);
  if (!block) {
    return interpolateLiquidPreviewVariables(source, context)
      .replace(/{%[\s\S]*?%}/g, "");
  }

  const before = source.slice(0, match.index);
  const after = source.slice(block.afterEnd);
  const bodyEnd = block.elseTag ? block.elseTag.index : block.endIndex;
  const mainBody = source.slice(openingTag.lastIndex, bodyEnd);
  const elseBody = block.elseTag
    ? source.slice(block.elseTag.end, block.endIndex)
    : "";
  let replacement = "";

  if (blockName === "if") {
    const chosenBody = evaluateLiquidPreviewCondition(match[2], context)
      ? mainBody
      : elseBody;
    replacement = renderLiquidPreviewBlocks(chosenBody, context);
  } else {
    const loop = match[2].trim().match(/^(\w+)\s+in\s+([\w.]+)(?:\s+limit:\s*(\d+))?/);
    if (loop) {
      const items = getLiquidPreviewValue(loop[2], context);
      const list = Array.isArray(items) ? items : [];
      const limitedList = loop[3] ? list.slice(0, Number(loop[3])) : list;
      replacement = limitedList.length
        ? limitedList.map((item, index) => renderLiquidPreviewBlocks(mainBody, {
            ...context,
            [loop[1]]: item,
            forloop: {
              index: index + 1,
              index0: index,
              first: index === 0,
              last: index === limitedList.length - 1,
              length: limitedList.length
            }
          })).join("")
        : renderLiquidPreviewBlocks(elseBody, context);
    }
  }

  return renderLiquidPreviewBlocks(before, context) +
    replacement +
    renderLiquidPreviewBlocks(after, context);
}

function prepareLiquidPreview(source, options = {}) {
  const includes = options.includes || {};
  const context = {
    collections: { posts: LIQUID_PREVIEW_POSTS },
    site: {
      title: "Minimalistycznie Przez Życie",
      url: "https://minimalistycznie.pages.dev"
    },
    page: {
      title: editorTitle?.value?.trim() || "Podgląd strony",
      url: selectedPage?.url || "/"
    },
    ...options.context
  };

  let previewSource = String(source || "")
    .replace(/{%\s*comment\s*%}[\s\S]*?{%\s*endcomment\s*%}/g, "")
    .replace(/{%\s*include\s+['"]?([^\s'"]+)['"]?\s*%}/g, (_tag, path) => {
      const include = includes[path] ?? includes[path.replace(/^pages\//, "")];
      return include == null
        ? `<div class="markdown-preview-empty">Podgląd include: ${escapePreviewHtml(path)}</div>`
        : String(include);
    });

  previewSource = renderLiquidPreviewBlocks(previewSource, context)
    .replace(/{%\s*(?:assign|capture|endcapture)[\s\S]*?%}/g, "")
    .replace(/{%[\s\S]*?%}/g, "");

  const containsHtml = /<\/?[a-z][\s\S]*?>/i.test(previewSource);
  return containsHtml
    ? previewSource
    : marked.parse(previewSource, { breaks: true, gfm: true });
}

function updateSourceHighlight() {
  if (!editorHighlight) return;

  const source = String(editorBody.value || "");
  if (editorLineNumbers) {
    const lineCount = Math.max(1, source.split("\n").length);
    editorLineNumbers.textContent = Array.from(
      { length: lineCount },
      (_item, index) => String(index + 1)
    ).join("\n");
  }
  const tokenPattern = /({%[\s\S]*?%}|{{[\s\S]*?}}|<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|^#{1,6}\s.*$)/gm;
  let cursor = 0;
  let highlighted = "";

  source.replace(tokenPattern, (token, _capture, offset) => {
    highlighted += escapePreviewHtml(source.slice(cursor, offset));
    let className = "syntax-tag";
    if (token.startsWith("{%") || token.startsWith("{{")) className = "syntax-liquid";
    if (token.startsWith("<!--")) className = "syntax-comment";
    if (token.startsWith("#")) className = "syntax-heading";
    highlighted += `<span class="${className}">${escapePreviewHtml(token)}</span>`;
    cursor = offset + token.length;
    return token;
  });

  highlighted += escapePreviewHtml(source.slice(cursor));
  editorHighlight.innerHTML = `${highlighted}\n`;
}

function renderSitePreview(html) {
  if (!sitePreviewFrame) return;

  const baseUrl = `${window.location.origin}/`;
  const pageKey = String(selectedPage?.path || "home")
    .split(/[\\/]/)
    .pop()
    .replace(/\.liquid$/i, "")
    .toLowerCase();
  const navItems = [
    ["home", "Główna"],
    ["about", "O mnie"],
    ["contact", "Kontakt"],
    ["newsletter", "Newsletter"]
  ].map(([key, label]) =>
    `<li><a class="${key === pageKey ? "active" : ""}">${label}</a></li>`
  ).join("");
  sitePreviewFrame.srcdoc = `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<base href="${baseUrl}"><link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="/css/newsletter.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>body{margin:0}.preview-note{padding:.55rem 1rem;background:#f5f1e8;color:#625d52;font:12px Montserrat,sans-serif;text-align:center}</style>
</head><body><div class="preview-note">Podgląd lokalny — wygląd i CSS bloga</div><div class="container">
<header><h1>Minimalistycznie Przez Życie</h1><p>Małe przygody w wielkim świecie</p></header>
<nav><ul>${navItems}</ul></nav>
<main class="page-section active-section">${html}</main></div></body></html>`;
}

function renderMarkdownPreview() {
  clearPreviewImageSelection();
  updateSourceHighlight();
  const title = editorTitle.value.trim();
  const markdown = editorBody.value || "";

  updateEditorStatistics(markdown);
  updateEditorOutline(markdown);
  updateQualityToolkit(markdown);

  if (!title && !markdown.trim()) {
    if (sitePreviewFrame) sitePreviewFrame.hidden = true;
    markdownPreview.hidden = false;
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

  const renderedBody = editorContentType === "page"
    ? prepareLiquidPreview(source)
    : marked.parse(source, {
        breaks: true,
        gfm: true,
      });
  

  const renderedTitle = title && editorContentType !== "page"
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
      image.src =
        `https://minimalistycznie.pages.dev${imageSource}`;
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

if (editorContentType === "page") {
  markdownPreview.hidden = true;
  sitePreviewFrame.hidden = false;
  renderSitePreview(previewContainer.innerHTML);
} else {
  markdownPreview.hidden = false;
  sitePreviewFrame.hidden = true;
}
}

function updateEditorOutline(source) {
  if (!editorOutline) return;
  const headings = [];
  const markdownPattern = /^(#{1,6})\s+(.+)$/gm;
  const htmlPattern = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = markdownPattern.exec(source)) !== null) {
    headings.push({ level: match[1].length, text: match[2].replace(/[*_`[\]]/g, "").trim(), position: match.index });
  }
  while ((match = htmlPattern.exec(source)) !== null) {
    headings.push({ level: Number(match[1]), text: match[2].replace(/<[^>]+>/g, "").trim(), position: match.index });
  }
  headings.sort((left, right) => left.position - right.position);
  editorOutline.innerHTML = '<option value="">Nagłówki</option>';
  headings.forEach((heading) => {
    const option = document.createElement("option");
    option.value = String(heading.position);
    option.textContent = `${"— ".repeat(Math.max(0, heading.level - 1))}${heading.text || `H${heading.level}`}`;
    editorOutline.appendChild(option);
  });
  editorOutline.disabled = headings.length === 0;
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

function createSlugWhileTyping(value) {
  const hasTrailingSeparator = /[-\s]$/.test(String(value || ""));
  const slug = createSlug(value);
  return hasTrailingSeparator && slug ? `${slug}-` : slug;
}

function getPlainEditorText(source) {
  return String(source || "")
    .replace(POST_TAGS_METADATA_PATTERN, "")
    .replace(POST_SEO_METADATA_PATTERN, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getEditorDescription(source) {
  const withoutMetadata = stripPostMetadata(source);
  const beforeExcerpt = withoutMetadata.split("<!-- more -->")[0];
  return getPlainEditorText(beforeExcerpt).slice(0, 180);
}

function analyzeEditorImages(source) {
  const images = [];
  const markdownPattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  const htmlPattern = /<img\b[^>]*>/gi;
  let match;

  while ((match = markdownPattern.exec(source))) {
    images.push({ alt: match[1].trim(), src: match[2] });
  }
  while ((match = htmlPattern.exec(source))) {
    const tag = match[0];
    const alt = tag.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1]?.trim() || "";
    const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] || "";
    images.push({ alt, src });
  }

  return images;
}

function analyzeEditorLinks(source) {
  const links = [];
  const markdownPattern = /(?<!!)\[[^\]]+\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  const htmlPattern = /<a\b[^>]*href\s*=\s*["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = markdownPattern.exec(source))) links.push(match[1]);
  while ((match = htmlPattern.exec(source))) links.push(match[1]);
  return links;
}

function hasHeadingOrderIssue(source) {
  const levels = [];
  const markdownPattern = /^(#{1,6})\s+.+$/gm;
  const htmlPattern = /<h([1-6])\b[^>]*>/gi;
  let match;
  while ((match = markdownPattern.exec(source))) levels.push({ level: match[1].length, position: match.index });
  while ((match = htmlPattern.exec(source))) levels.push({ level: Number(match[1]), position: match.index });
  levels.sort((left, right) => left.position - right.position);
  return levels.some((heading, index) => index > 0 && heading.level > levels[index - 1].level + 1);
}

function updateQualityToolkit(source) {
  if (!qualityToolkit || !qualityChecks || !qualityScore) return;

  const seo = getSeoEditorValues();
  const title = seo.title || editorTitle.value.trim();
  const slug = editorSlug.value.trim();
  const text = getPlainEditorText(source);
  const description = seo.description;
  const words = text ? text.split(/\s+/).length : 0;
  const sentences = text.split(/[.!?]+(?:\s|$)/).map((item) => item.trim()).filter(Boolean);
  const averageSentenceLength = sentences.length ? words / sentences.length : 0;
  const headings = (String(source).match(/^(#{1,6})\s+.+$/gm) || []).length +
    (String(source).match(/<h[1-6]\b[^>]*>/gi) || []).length;
  const images = analyzeEditorImages(source);
  const missingAlt = images.filter((image) => !image.alt).length;
  const links = analyzeEditorLinks(source);
  const suspiciousLinks = links.filter((href) =>
    !href || /^javascript:/i.test(href) || href === "#"
  ).length;
  const largeImages = images.filter((image) => {
    const media = mediaItems.find((item) => [getMediaUrl(item), getMediaUrl(item, true)].includes(image.src));
    return Number(media?.size || 0) > 1024 * 1024;
  }).length;

  const checks = [
    { pass: title.length >= 30 && title.length <= 60, label: "Tytuł SEO", detail: `${title.length}/30–60 znaków` },
    { pass: description.length >= 120 && description.length <= 160, label: "Opis", detail: `${description.length}/120–160 znaków` },
    { pass: Boolean(seo.image), label: "Obraz Open Graph", detail: seo.image ? "Ustawiony" : "Brak obrazu" },
    { pass: !seo.canonical || /^https?:\/\//i.test(seo.canonical), label: "Canonical", detail: seo.canonical ? "Własny adres" : "Automatyczny adres wpisu" },
    { pass: seo.robots === "index,follow", label: "Indeksowanie", detail: seo.robots.replace(",", ", ") },
    { pass: words >= 300, label: "Długość treści", detail: `${words}/min. 300 słów` },
    { pass: headings > 0 && !hasHeadingOrderIssue(source), label: "Struktura nagłówków", detail: headings ? `${headings} nagłówków` : "Brak nagłówków" },
    { pass: averageSentenceLength <= 22 || sentences.length === 0, label: "Czytelność zdań", detail: `${averageSentenceLength.toFixed(1)} słowa na zdanie` },
    { pass: missingAlt === 0, label: "Opisy obrazów", detail: missingAlt ? `${missingAlt} bez tekstu alt` : `${images.length} sprawdzonych` },
    { pass: suspiciousLinks === 0, label: "Linki", detail: suspiciousLinks ? `${suspiciousLinks} podejrzanych` : `${links.length} sprawdzonych` },
    { pass: largeImages === 0, label: "Rozmiar obrazów", detail: largeImages ? `${largeImages} powyżej 1 MB` : "Brak dużych obrazów" },
  ];
  const score = Math.round(checks.filter((check) => check.pass).length / checks.length * 100);

  qualityScore.className = `quality-score ${score >= 75 ? "is-good" : score >= 50 ? "is-warning" : "is-poor"}`;
  qualityScore.innerHTML = `<strong>${score}</strong><span>/100</span>`;
  qualityChecks.innerHTML = "";
  checks.forEach((check) => {
    const item = document.createElement("li");
    item.className = check.pass ? "is-pass" : "is-warning";
    item.innerHTML = `<i class="fa-solid ${check.pass ? "fa-circle-check" : "fa-triangle-exclamation"}"></i><span><strong></strong><small></small></span>`;
    item.querySelector("strong").textContent = check.label;
    item.querySelector("small").textContent = check.detail;
    qualityChecks.appendChild(item);
  });

  ogPreviewTitle.textContent = title || "Tytuł wpisu";
  ogPreviewDescription.textContent = description || "Opis wpisu pojawi się tutaj.";
  const generatedUrl = `https://minimalistycznie.pages.dev/_posts/${slug || "adres-wpisu"}/`;
  ogPreviewUrl.textContent = (seo.canonical || generatedUrl).replace(/^https?:\/\//, "");
  if (ogPreviewImage) {
    ogPreviewImage.hidden = !seo.image;
    ogPreviewImage.src = seo.image || "";
  }
}

function confirmSeoBeforeSave() {
  const seo = getSeoEditorValues();
  const seoTitle = seo.title || editorTitle.value.trim();
  const warnings = [];
  if (seoTitle.length < 30 || seoTitle.length > 60) warnings.push(`tytuł SEO ma ${seoTitle.length} znaków zamiast 30–60`);
  if (seo.description.length < 120 || seo.description.length > 160) warnings.push(`opis SEO ma ${seo.description.length} znaków zamiast 120–160`);
  if (!seo.image) warnings.push("brakuje obrazu Open Graph");
  if (seo.canonical && !/^https?:\/\//i.test(seo.canonical)) warnings.push("adres canonical jest nieprawidłowy");
  if (!warnings.length) return true;
  return window.confirm(`Analiza SEO wykryła problemy:\n\n• ${warnings.join("\n• ")}\n\nZapisać mimo to?`);
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

/* =========================================================
   TOAST MANAGER
   ========================================================= */

function showToast({
  title = "",
  message = "",
  type = "info",
  duration = 3000,
}) {

  const container =
    document.getElementById(
      "toastContainer"
    );

  if (!container) {
    return;
  }

  const icons = {
    success:
      "fa-solid fa-circle-check",
    error:
      "fa-solid fa-circle-xmark",
    info:
      "fa-solid fa-circle-info",
    warning:
      "fa-solid fa-triangle-exclamation",
  };

  const toast =
    document.createElement("div");

  toast.className =
    `toast toast-${type}`;

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${icons[type] || icons.info}"></i>
    </div>

    <div class="toast-content">
      <strong class="toast-title">
        ${title}
      </strong>

      <div class="toast-message">
        ${message}
      </div>
    </div>

    <button
      class="toast-close"
      type="button"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add(
      "toast-visible"
    );
  });

  const removeToast = () => {

    toast.classList.remove(
      "toast-visible"
    );

    toast.classList.add(
      "toast-hiding"
    );

    setTimeout(() => {
      toast.remove();
    }, 220);

  };

  toast
    .querySelector(".toast-close")
    ?.addEventListener(
      "click",
      removeToast
    );

  setTimeout(
    removeToast,
    duration
  );

}

function setMediaDeleteProgress(value, text) {
  const progress = Math.min(100, Math.max(0, Math.round(value)));
  if (mediaDeleteProgressBar) mediaDeleteProgressBar.style.width = `${progress}%`;
  if (mediaDeleteProgressValue) mediaDeleteProgressValue.textContent = `${progress}%`;
  if (mediaDeleteProgressText && text) mediaDeleteProgressText.textContent = text;
  mediaDeleteProgressDialog?.querySelector('[role="progressbar"]')?.setAttribute("aria-valuenow", String(progress));
}

async function deleteSelectedMedia() {
  const items = selectedMediaPaths.size
    ? mediaItems.filter((item) => selectedMediaPaths.has(item.path))
    : selectedMedia ? [selectedMedia] : [];
  if (!items.length) return;

  const confirmed = window.confirm(items.length === 1
    ? `Czy na pewno chcesz usunąć obraz?\n\n${items[0].name}\n\nTej operacji nie można cofnąć z poziomu panelu.`
    : `Czy na pewno chcesz usunąć ${items.length} zaznaczonych obrazów w jednym commicie?\n\nTej operacji nie można cofnąć z poziomu panelu.`);
  if (!confirmed) return;

  mediaDeleteController = new AbortController();
  cancelMediaDeleteButton.disabled = false;
  cancelMediaDeleteButton.textContent = "Anuluj";
  mediaDeleteProgressTitle.textContent = `Usuwanie ${items.length} ${items.length === 1 ? "obrazu" : "obrazów"}`;
  setMediaDeleteProgress(8, "Przygotowanie jednego zbiorczego commita…");
  mediaDeleteProgressDialog.showModal();
  deleteMediaButton.disabled = true;

  let simulatedProgress = 8;
  mediaDeleteProgressTimer = window.setInterval(() => {
    simulatedProgress = Math.min(90, simulatedProgress + Math.max(1, Math.round((92 - simulatedProgress) / 8)));
    setMediaDeleteProgress(simulatedProgress, simulatedProgress < 55 ? "Weryfikowanie plików…" : "Zapisywanie zmian w GitHubie…");
  }, 450);

  try {
    const response = await adminApiFetch(ADMIN_BULK_DELETE_MEDIA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminSecret}` },
      body: JSON.stringify({ items: items.map(({ name, path, sha }) => ({ name, path, sha })) }),
      signal: mediaDeleteController.signal,
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error(result.message || "Nie udało się usunąć obrazów.");

    const deletedPaths = new Set(items.map((item) => item.path));
    mediaItems = mediaItems.filter((item) => !deletedPaths.has(item.path));
    selectedMediaPaths.clear();
    closeMediaPanel();
    selectedMediaCard = null;
    renderMedia();
    setMediaDeleteProgress(100, `Usunięto ${items.length} ${items.length === 1 ? "obraz" : "obrazów"} w jednym commicie.`);
    cancelMediaDeleteButton.disabled = true;
    showToast({ title: "Biblioteka mediów", message: `Usunięto ${items.length} ${items.length === 1 ? "obraz" : "obrazów"}.`, type: "success", duration: 3500 });
    window.setTimeout(() => mediaDeleteProgressDialog.close(), 1000);
  } catch (error) {
    if (error?.name === "AbortError") {
      setMediaDeleteProgress(0, "Operacja została anulowana. Odświeżam bibliotekę…");
      await loadMedia(true);
      window.setTimeout(() => mediaDeleteProgressDialog.close(), 700);
    } else {
      setMediaDeleteProgress(0, error instanceof Error ? error.message : "Usuwanie nie powiodło się.");
      cancelMediaDeleteButton.textContent = "Zamknij";
      cancelMediaDeleteButton.disabled = false;
    }
  } finally {
    window.clearInterval(mediaDeleteProgressTimer);
    mediaDeleteProgressTimer = null;
    mediaDeleteController = null;
    updateMediaSelectionState();
  }
}

async function deleteSelectedMediaSequential() {
  const mediaToDelete = selectedMediaPaths.size
    ? mediaItems.filter((item) => selectedMediaPaths.has(item.path))
    : selectedMedia ? [selectedMedia] : [];

  if (!mediaToDelete.length) {
    return;
  }

  const confirmed = window.confirm(
    mediaToDelete.length === 1
      ? `Czy na pewno chcesz usunąć obraz?\n\n${mediaToDelete[0].name}\n\nTej operacji nie można cofnąć z poziomu panelu.`
      : `Czy na pewno chcesz usunąć ${mediaToDelete.length} zaznaczonych obrazów?\n\nTej operacji nie można cofnąć z poziomu panelu.`
  );

  if (!confirmed) {
    return;
  }

  deleteMediaButton.disabled = true;
  deleteMediaButton.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Usuwanie...
  `;
  if (mediaUploadStatus) {
    mediaUploadStatus.textContent = `Przygotowanie usuwania ${mediaToDelete.length} obrazów…`;
    mediaUploadStatus.className = "media-upload-status is-working";
  }

  try {
    for (let index = 0; index < mediaToDelete.length; index += 1) {
      const item = mediaToDelete[index];
      deleteMediaButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Usuwanie ${index + 1}/${mediaToDelete.length}…`;
      if (mediaUploadStatus) mediaUploadStatus.textContent = `Usuwanie ${index + 1} z ${mediaToDelete.length}: ${item.name}`;
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 30000);
      let response;
      try {
        response = await adminApiFetch(ADMIN_DELETE_MEDIA_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminSecret}` },
          body: JSON.stringify({ name: item.name, path: item.path, sha: item.sha }),
          signal: controller.signal,
        });
      } catch (error) {
        if (error?.name === "AbortError") throw new Error(`${item.name}: przekroczono 30 sekund oczekiwania na GitHub.`);
        throw error;
      } finally {
        window.clearTimeout(timeout);
      }
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(`${item.name}: ${result.message || "Nie udało się usunąć obrazu."}`);
      }
      deletedPaths.add(item.path);
    }

    mediaItems = mediaItems.filter(
      (item) => !deletedPaths.has(item.path)
    );

    selectedMediaPaths.clear();
    closeMediaPanel();

    selectedMediaCard = null;

    renderMedia();
    if (mediaUploadStatus) {
      mediaUploadStatus.textContent = `Usunięto ${mediaToDelete.length} obrazów.`;
      mediaUploadStatus.className = "media-upload-status is-success";
    }

    showToast({
      title: "Biblioteka mediów",
      message: mediaToDelete.length === 1
        ? "Obraz został usunięty. Cloudflare opublikuje nową wersję strony."
        : `Usunięto ${mediaToDelete.length} obrazów. Cloudflare opublikuje nowe wersje strony.`,
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    if (deletedPaths.size) {
      mediaItems = mediaItems.filter((item) => !deletedPaths.has(item.path));
      deletedPaths.forEach((path) => selectedMediaPaths.delete(path));
      renderMedia();
    }
    if (mediaUploadStatus) {
      mediaUploadStatus.textContent = error instanceof Error ? error.message : "Usuwanie obrazów nie powiodło się.";
      mediaUploadStatus.className = "media-upload-status is-error";
    }
    showToast({
      title: "Błąd usuwania obrazu",
      message: error instanceof Error
        ? error.message
        : "Nie udało się usunąć obrazu.",
      type: "error",
      duration: 5000,
    });
  } finally {
    updateMediaSelectionState();
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

function applySourceAction(action) {
  const start = editorBody.selectionStart;
  const end = editorBody.selectionEnd;
  const selectedText = editorBody.value.slice(start, end);
  const actions = {
    paragraph: { before: "<p>", after: "</p>", placeholder: "Treść akapitu" },
    section: { before: "<section>\n  ", after: "\n</section>", placeholder: "Treść sekcji", block: true },
    "liquid-output": { before: "{{ ", after: " }}", placeholder: "variable" },
    "liquid-if": { before: "{% if condition %}\n", after: "\n{% endif %}", placeholder: "Treść warunkowa", block: true },
  };
  const config = actions[action];
  if (config) insertMarkdownSyntax({ start, end, selectedText, ...config });
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

async function uploadImageFile(file, signal) {
  if (!file?.type?.startsWith("image/")) {
    throw new Error(
      `Plik "${file?.name || "bez nazwy"}" nie jest obrazem.`
    );
  }

  const base64 = await fileToBase64(file);
  if (signal?.aborted) {
    throw new DOMException("Wysyłanie anulowane.", "AbortError");
  }
  const response = await adminApiFetch(
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
      signal,
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

function setMediaUploadProgress(value, text) {
  const progress = Math.max(0, Math.min(100, Math.round(value)));
  if (mediaUploadProgressBar) mediaUploadProgressBar.style.width = `${progress}%`;
  if (mediaUploadProgressValue) mediaUploadProgressValue.textContent = `${progress}%`;
  if (mediaUploadProgressText && text) mediaUploadProgressText.textContent = text;
  mediaUploadProgressDialog?.querySelector('[role="progressbar"]')?.setAttribute("aria-valuenow", String(progress));
}

async function uploadMediaFiles(fileList) {
  const files = Array.from(fileList || []);

  if (files.length === 0) {
    return;
  }

  mediaUploadButton.disabled = true;
  mediaChooseButton.disabled = true;
  mediaDropzone?.classList.add("is-uploading");

  const originalUploadButtonHtml =
    mediaUploadButton.innerHTML;

  mediaUploadButton.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Wysyłanie...
  `;

  let uploadedCount = 0;
  const uploadedFiles = [];
  const errors = [];
  let cancelled = false;
  mediaUploadController = new AbortController();
  cancelMediaUploadButton.disabled = false;
  cancelMediaUploadButton.textContent = "Anuluj";
  mediaUploadProgressTitle.textContent = files.length === 1
    ? "Wysyłanie obrazu"
    : `Wysyłanie ${files.length} obrazów`;
  setMediaUploadProgress(0, "Przygotowanie plików…");
  mediaUploadProgressDialog?.showModal();

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const currentFileNumber = index + 1;
    mediaUploadButton.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Wysyłanie ${currentFileNumber}/${files.length}...
    `;
    if (mediaUploadStatus) {
      mediaUploadStatus.textContent =
        `Wysyłanie ${currentFileNumber} z ${files.length}: ${file.name}`;
    }
    setMediaUploadProgress(
      (index / files.length) * 100,
      `Wysyłanie ${currentFileNumber} z ${files.length}: ${file.name}`
    );
    try {
      const uploadResult = await uploadImageFile(file, mediaUploadController.signal);
      uploadedCount++;
      uploadedFiles.push({ file, uploadResult });
    } catch (error) {
      if (error?.name === "AbortError") {
        cancelled = true;
        break;
      }
      errors.push(
        error instanceof Error
          ? error.message
          : `Nie udało się wysłać pliku "${file.name}".`
      );
    }
    setMediaUploadProgress(
      ((index + 1) / files.length) * 100,
      `Przetworzono ${index + 1} z ${files.length} obrazów.`
    );
  }

  try {
    if (uploadedCount > 0) {
      mediaLoaded = false;
      await loadMedia(true);
      applyLocalMediaPreviews(uploadedFiles);

      showToast({
        title: "Biblioteka mediów",
        message: uploadedCount === 1
          ? "Obraz został dodany do biblioteki."
          : `Dodano ${uploadedCount} obrazów do biblioteki.`,
        type: "success",
        duration: 3000,
      });
    }

    if (errors.length > 0) {
      showToast({
        title: "Błąd wysyłania obrazów",
        message: errors.join(" "),
        type: "error",
        duration: 5000,
      });
    }

    const processedCount = uploadedCount + errors.length;
    if (cancelled) {
      mediaUploadProgressTitle.textContent = "Wysyłanie anulowane";
      setMediaUploadProgress(
        (processedCount / files.length) * 100,
        `Dodano ${uploadedCount} z ${files.length} obrazów. Pozostałe pliki pominięto.`
      );
    } else if (errors.length > 0) {
      mediaUploadProgressTitle.textContent = "Wysyłanie zakończone z błędami";
      setMediaUploadProgress(100, `Dodano ${uploadedCount} z ${files.length} obrazów.`);
    } else {
      mediaUploadProgressTitle.textContent = "Wysyłanie zakończone";
      setMediaUploadProgress(100, uploadedCount === 1 ? "Obraz dodano do biblioteki." : `Dodano ${uploadedCount} obrazów do biblioteki.`);
    }
  } finally {
    mediaUploadController = null;
    cancelMediaUploadButton.disabled = false;
    cancelMediaUploadButton.textContent = "Zamknij";
    mediaUploadButton.disabled = false;
    mediaChooseButton.disabled = false;
    mediaDropzone?.classList.remove("is-uploading");
    mediaUploadButton.innerHTML =
      originalUploadButtonHtml;
    if (mediaUploadStatus) {
      mediaUploadStatus.textContent = cancelled
        ? `Wysyłanie anulowano. Dodano ${uploadedCount} z ${files.length} obrazów.`
        : errors.length > 0
        ? `Dodano ${uploadedCount} z ${files.length} obrazów.`
        : uploadedCount === 1
          ? "Dodano 1 obraz."
          : `Dodano obrazów: ${uploadedCount}.`;
    }
  }
}

async function downloadSelectedMedia() {
  if (!selectedMedia || !downloadMediaButton) {
    return;
  }

  const mediaToDownload = selectedMedia;
  const originalButtonHtml = downloadMediaButton.innerHTML;
  downloadMediaButton.disabled = true;
  downloadMediaButton.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    Pobieranie...
  `;

  try {
    const response = await fetch(getMediaUrl(mediaToDownload, true), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Nie udało się pobrać pliku (${response.status}).`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = mediaToDownload.name || "obraz";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch (error) {
    showToast({
      title: "Błąd pobierania obrazu",
      message: error instanceof Error
        ? error.message
        : "Nie udało się pobrać obrazu.",
      type: "error",
      duration: 5000,
    });
  } finally {
    downloadMediaButton.disabled = false;
    downloadMediaButton.innerHTML = originalButtonHtml;
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

  showLoadingSkeleton(mediaGrid, 8);

  try {
    const response = await adminApiFetch(
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
    card.dataset.mediaPath = item.path || "";
    card._mediaItem = item;
    card.classList.toggle("is-selected", selectedMediaPaths.has(item.path));
    card.setAttribute("aria-pressed", String(selectedMediaPaths.has(item.path)));

    card.addEventListener("dragstart", (event) => {
      if (!hasActiveEditorSession()) {
        event.preventDefault();
        showToast({
          title: "Edytor",
          message: "Najpierw otwórz lub utwórz wpis, do którego chcesz wstawić obraz.",
          type: "error",
          duration: 5000,
        });
        return;
      }

      selectMediaCard(card, item);
      const url = getMediaUrl(item);
      const alt = String(item.name || "Obraz").replace(/\.[^.]+$/, "");
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("text/plain", `![${alt}](${url})`);
      event.dataTransfer.setData("application/x-panel-media", JSON.stringify({ url, alt }));

      window.requestAnimationFrame(() => {
        restoreEditorAfterMedia();
        editorBody?.classList.add("is-media-drop-target");
      });
    });

    card.addEventListener("dragend", clearMediaDropTarget);

    const image =
      document.createElement("img");

    image.alt =
      item.name || "Obraz";

    image.loading = "lazy";
    loadMediaThumbnail(image, item);

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

    const selectionMark = document.createElement("span");
    selectionMark.className = "media-selection-mark";
    selectionMark.innerHTML = '<i class="fa-solid fa-check"></i>';
    selectionMark.setAttribute("aria-hidden", "true");

    card.append(image, details, selectionMark);

    card.addEventListener("click", (event) => {
      const additive = event.ctrlKey || event.metaKey || Boolean(event.target.closest(".media-selection-mark"));
      selectMediaCard(card, item, { additive, toggle: additive });
    });

    card.addEventListener("dblclick", (event) => {
      event.preventDefault();
      selectMediaCard(card, item);
      insertSelectedMediaToEditor();
    });

    mediaGrid.appendChild(card);
  });
}

function selectMediaCard(card, item, options = {}) {
  if (!options.additive) {
    selectedMediaPaths.clear();
    mediaGrid?.querySelectorAll(".media-card.is-selected").forEach((element) => {
      element.classList.remove("is-selected");
      element.setAttribute("aria-pressed", "false");
    });
  }

  if (options.toggle && selectedMediaPaths.has(item.path)) {
    selectedMediaPaths.delete(item.path);
    card.classList.remove("is-selected", "active", "keyboard-active");
    card.setAttribute("aria-pressed", "false");
    const fallbackPath = [...selectedMediaPaths].at(-1);
    const fallbackCard = fallbackPath ? mediaGrid?.querySelector(`[data-media-path="${CSS.escape(fallbackPath)}"]`) : null;
    if (fallbackCard?._mediaItem) {
      selectMediaCard(fallbackCard, fallbackCard._mediaItem, { additive: true });
    } else {
      closeMediaPanel();
      updateMediaSelectionState();
    }
    return;
  }

  selectedMediaCard?.classList.remove("active", "keyboard-active");
  selectedMediaCard = card;
  selectedMedia = item;
  selectedMediaPaths.add(item.path);
  card.classList.add("active", "is-selected");
  card.setAttribute("aria-pressed", "true");

  if (options.keyboard === true) {
    card.classList.add("keyboard-active");
    card.focus({ preventScroll: true });
    card.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  openMediaSidebar(item);
  updateMediaSelectionState();
}

function updateMediaSelectionState() {
  if (!deleteMediaButton) return;
  const count = selectedMediaPaths.size;
  deleteMediaButton.disabled = count === 0;
  deleteMediaButton.innerHTML = `<i class="fa-regular fa-trash-can"></i> ${count > 1 ? `Usuń (${count})` : "Usuń"}`;
}

function insertSelectedMediaToEditor() {
  if (!selectedMedia) {
    return false;
  }

  if (!hasActiveEditorSession()) {
    showToast({
      title: "Edytor",
      message: "Najpierw otwórz lub utwórz wpis, do którego chcesz wstawić obraz.",
      type: "error",
      duration: 5000,
    });
    return false;
  }

  insertImageMarkdown(
    getMediaUrl(selectedMedia),
    String(selectedMedia.name || "Obraz").replace(/\.[^.]+$/, "")
  );
  closeMediaPanel();
  restoreEditorAfterMedia();
  return true;
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

  const imageUrl =
    getMediaUrl(item, true);

  mediaPreviewImage.src = imageUrl;
  mediaPreviewImage.alt =
    item.name || "Podgląd obrazu";

  mediaName.value =
    item.name || "";

  mediaUrl.value =
    getMediaUrl(item);

  mediaSize.textContent =
    formatFileSize(item.size);

  const mediaType =
    document.getElementById("mediaType");

  const mediaDimensions =
    document.getElementById(
      "mediaDimensions"
    );

  if (mediaType) {
    mediaType.textContent =
      getMediaFileType(item.name);
  }

  if (mediaDimensions) {
    mediaDimensions.textContent =
      "Ładowanie…";
  }

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
        "Brak danych";
    }
  };

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
    (item.path
      ? `/${String(item.path).replace(/^\/+/, "")}`
      : "");

  if (!absolute) {
    return relativeUrl || item.absoluteUrl || item.downloadUrl || item.download_url || "";
  }

  const explicitAbsoluteUrl =
    item.absoluteUrl || item.downloadUrl || item.download_url || "";

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

function normalizePostTags(tags) {
  if (Array.isArray(tags)) {
    return [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))];
  }

  return [...new Set(String(tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean))];
}

const POST_TAGS_METADATA_PATTERN =
  /^\s*<!--\s*cms-tags:\s*(\[[\s\S]*?\])\s*-->\s*/i;
const POST_SEO_METADATA_PATTERN =
  /^\s*<!--\s*cms-seo:\s*(\{[\s\S]*?\})\s*-->\s*/i;

function extractPostTagsMetadata(content) {
  const match = String(content || "").match(POST_TAGS_METADATA_PATTERN);
  if (!match) {
    return [];
  }

  try {
    return normalizePostTags(JSON.parse(match[1]));
  } catch {
    return [];
  }
}

function stripPostTagsMetadata(content) {
  return String(content || "").replace(POST_TAGS_METADATA_PATTERN, "");
}

function extractPostSeoMetadata(content) {
  const withoutTags = stripPostTagsMetadata(content);
  const match = withoutTags.match(POST_SEO_METADATA_PATTERN);
  if (!match) return {};
  try { return JSON.parse(match[1]) || {}; } catch { return {}; }
}

function stripPostMetadata(content) {
  return stripPostTagsMetadata(content).replace(POST_SEO_METADATA_PATTERN, "");
}

function getSeoEditorValues() {
  return {
    title: editorSeoTitle?.value.trim() || "",
    description: editorSeoDescription?.value.trim() || "",
    image: editorSeoImage?.value.trim() || "",
    canonical: editorSeoCanonical?.value.trim() || "",
    robots: editorSeoRobots?.value || "index,follow",
    twitterCard: editorSeoTwitterCard?.value || "summary_large_image",
  };
}

function setSeoEditorValues(seo = {}) {
  if (editorSeoTitle) editorSeoTitle.value = seo.title || "";
  if (editorSeoDescription) editorSeoDescription.value = seo.description || "";
  if (editorSeoImage) editorSeoImage.value = seo.image || "";
  if (editorSeoCanonical) editorSeoCanonical.value = seo.canonical || "";
  if (editorSeoRobots) editorSeoRobots.value = seo.robots || "index,follow";
  if (editorSeoTwitterCard) editorSeoTwitterCard.value = seo.twitterCard || "summary_large_image";
}

function getPostTags(post) {
  const explicitTags = normalizePostTags(post?.tags);
  if (explicitTags.length) {
    return explicitTags;
  }

  return extractPostTagsMetadata(post?.body || post?.excerpt || "");
}

function getPostBodyForSave() {
  const body = stripPostMetadata(editorBody.value);
  const tags = parsePostTags(editorTags.value);
  const seo = getSeoEditorValues();
  const metadata = [];
  if (tags.length) metadata.push(`<!-- cms-tags: ${JSON.stringify(tags)} -->`);
  metadata.push(`<!-- cms-seo: ${JSON.stringify(seo)} -->`);
  return `${metadata.join("\n")}\n\n${body}`;
}

function parsePostTags(value) {
  return normalizePostTags(value);
}

function getReadingTime(content) {
  const plainText = String(content || "")
    .replace(/^---[\s\S]*?---/, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]*\)/g, " ")
    .replace(/[`*_>#~-]/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
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

function initializeMediaControls() {
  document.getElementById("mediaTypeFilter")?.addEventListener("change", (event) => {
    mediaTypeFilter = event.target.value;
    renderMedia();
  });
  document.getElementById("mediaSortOrder")?.addEventListener("change", (event) => {
    mediaSortOrder = event.target.value;
    renderMedia();
  });
  document.getElementById("mediaFullscreenButton")?.addEventListener(
    "click",
    () => openMediaFullscreen()
  );
}

function loadMediaThumbnail(image, item) {
  image.src = getMediaUrl(item, true);
}

function applyLocalMediaPreviews(uploadedItems) {
  const cards = Array.from(
    mediaGrid?.querySelectorAll(".media-card") || []
  );

  uploadedItems.forEach(({ file, uploadResult }) => {
    const returnedUrl =
      uploadResult?.url ||
      uploadResult?.relativeUrl ||
      uploadResult?.publicUrl ||
      uploadResult?.path ||
      uploadResult?.image?.url ||
      uploadResult?.image?.path ||
      "";
    const returnedName = returnedUrl
      ? decodeURIComponent(String(returnedUrl).split("/").pop().split("?")[0])
      : "";
    const possibleNames = new Set([
      file.name,
      uploadResult?.name,
      uploadResult?.fileName,
      uploadResult?.image?.name,
      returnedName,
    ].filter(Boolean));
    const card = cards.find(
      (candidate) => possibleNames.has(candidate.dataset.mediaName)
    );
    const image = card?.querySelector("img");

    if (!image) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      image.onload = null;
    };
    image.src = objectUrl;
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

function markdownImageToHtml(source, alt, width = null) {
  const safeSource = String(source).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const safeAlt = String(alt || "Obraz").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const widthAttribute = Number.isFinite(Number(width))
    ? ` width="${Number(width)}"`
    : "";
  return `<img src="${safeSource}" alt="${safeAlt}"${widthAttribute}>`;
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
  previewResizeSession = { wrapper, image, startX: event.clientX, startWidth: bounds.width,
    minWidth: Math.min(120, containerWidth), maxWidth: Math.max(120, containerWidth) };
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
    clearMediaDropTarget();
  } catch (error) {
    console.error("Nie udało się wstawić przeciągniętego obrazu.", error);
    clearMediaDropTarget();
  }
}

function clearMediaDropTarget() {
  editorBody?.classList.remove("is-media-drop-target", "is-media-drag-over");
}

function getVisibleMediaCards() {
  return Array.from(mediaGrid?.querySelectorAll(".media-card") || []).filter(
    (card) => window.getComputedStyle(card).display !== "none"
  );
}

function getMediaCardInDirection(cards, currentIndex, key) {
  if (key === "ArrowLeft") return cards[Math.max(0, currentIndex - 1)];
  if (key === "ArrowRight") return cards[Math.min(cards.length - 1, currentIndex + 1)];

  const currentRect = cards[currentIndex].getBoundingClientRect();
  const direction = key === "ArrowUp" ? -1 : 1;
  const candidates = cards
    .map((card) => ({ card, rect: card.getBoundingClientRect() }))
    .filter(({ rect }) => direction < 0 ? rect.top < currentRect.top : rect.top > currentRect.top)
    .sort((a, b) => {
      const rowA = Math.abs(a.rect.top - currentRect.top);
      const rowB = Math.abs(b.rect.top - currentRect.top);
      if (rowA !== rowB) return rowA - rowB;
      return Math.abs(a.rect.left - currentRect.left) - Math.abs(b.rect.left - currentRect.left);
    });

  return candidates[0]?.card || cards[currentIndex];
}

function handleMediaKeyboard(event) {
  const mediaView = document.getElementById("view-media");
  if (!mediaView?.classList.contains("active-view")) return;

  const activeElement = document.activeElement;
  if (
    ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement?.tagName) ||
    activeElement?.isContentEditable ||
    document.querySelector("dialog[open]")
  ) {
    return;
  }

  const cards = getVisibleMediaCards();
  if (!cards.length) return;

  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    const currentIndex = Math.max(0, cards.indexOf(selectedMediaCard));
    const nextCard = selectedMediaCard
      ? getMediaCardInDirection(cards, currentIndex, event.key)
      : cards[0];
    selectMediaCard(nextCard, nextCard._mediaItem, { keyboard: true });
    return;
  }

  if (event.key === "Enter" && selectedMedia) {
    event.preventDefault();
    insertSelectedMediaToEditor();
    return;
  }

  if (event.key === "Delete" && selectedMedia) {
    event.preventDefault();
    deleteSelectedMedia();
  }
}

function initializeMediaV3() {
  initializeMediaControls();
  markdownPreview?.addEventListener("pointerdown", beginPreviewResize);
  document.addEventListener("pointermove", movePreviewResize);
  document.addEventListener("pointerup", finishPreviewResize);
  editorBody?.addEventListener("dragover", (event) => {
    if (event.dataTransfer?.types.includes("application/x-panel-media")) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      editorBody.classList.add("is-media-drag-over");
    }
  });
  editorBody?.addEventListener("dragleave", () => {
    editorBody.classList.remove("is-media-drag-over");
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
  document.addEventListener("keydown", handleMediaKeyboard);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMediaV3, { once: true });
} else {
  initializeMediaV3();
}
