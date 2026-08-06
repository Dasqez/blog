function getElement(id) {
  const element =
    document.getElementById(id);

  if (!element) {
    console.warn(
      `Nie znaleziono elementu #${id}`
    );
  }

  return element;
}

export const dom = {
  loginScreen:
    getElement("loginScreen"),

  adminApp:
    getElement("adminApp"),

  loginForm:
    getElement("loginForm"),

  secretInput:
    getElement("adminSecret"),

  loginButton:
    getElement("loginButton"),

  loginMessage:
    getElement("loginMessage"),

  logoutButton:
    getElement("logoutButton"),

  refreshButton:
    getElement("refreshButton"),

  connectionStatus:
    getElement("connectionStatus"),

  lastUpdated:
    getElement("lastUpdated"),

  globalMessage:
    getElement("globalMessage"),

  viewTitle:
    getElement("viewTitle"),

  postsList:
    getElement("postsList"),

  postsSearchInput:
    getElement("postsSearchInput"),

  previewTitle:
    getElement("previewTitle"),

  previewDate:
    getElement("previewDate"),

  previewExcerpt:
    getElement("previewExcerpt"),

  openPostButton:
    getElement("openPostButton"),

  editPostButton:
    getElement("editPostButton"),

  deletePostButton:
    getElement("deletePostButton"),

  reloadPostsButton:
    getElement("reloadPostsButton"),

  newPostButton:
    getElement("newPostButton"),

  editorPanel:
    getElement("editorPanel"),

  editorOverlay:
    getElement("editorOverlay"),

  closeEditorButton:
    getElement("closeEditorButton"),

  editorTitle:
    getElement("editorTitle"),

  editorSlug:
    getElement("editorSlug"),

  editorDate:
    getElement("editorDate"),

  editorLayout:
    getElement("editorLayout"),

  editorBody:
    getElement("editorBody"),

  markdownPreview:
    getElement("markdownPreview"),

  editorStatistics:
    getElement("editorStatistics"),

  savePostButton:
    getElement("savePostButton"),

  cancelEditButton:
    getElement("cancelEditButton"),

  uploadImageButton:
    getElement("uploadImageButton"),

  imageUploadInput:
    getElement("imageUploadInput"),

  sidebar:
    getElement("sidebar"),

  sidebarOverlay:
    getElement("sidebarOverlay"),

  menuButton:
    getElement("menuButton"),

  mobileCloseButton:
    getElement("mobileCloseButton"),

  navItems:
    document.querySelectorAll(
      ".nav-item"
    ),

  panelViews:
    document.querySelectorAll(
      ".panel-view"
    ),

  openViewButtons:
    document.querySelectorAll(
      "[data-open-view]"
    ),

  markdownToolbarButtons:
    document.querySelectorAll(
      "[data-markdown-action]"
    ),
};