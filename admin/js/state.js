export const state = {
  adminSecret:
    sessionStorage.getItem(
      "mpzPanelAdminSecret"
    ) || "",

  posts: [],
  selectedPost: null,
  editedPost: null,

  postsLoaded: false,
  slugEditedManually: false,
  isCreatingNewPost: false,

  activeSearchResultIndex: -1,

  selectedPreviewImage: null,
  selectedPreviewImageWrapper: null,
};