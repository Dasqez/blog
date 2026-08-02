"use strict";

function switchPage(pageId) {
    const targetSection = document.getElementById(`page-${pageId}`);
    if (!targetSection) return;

    document.querySelectorAll(".page-section").forEach((section) => {
        section.classList.remove("active-section");
    });

    document.querySelectorAll("nav [data-page]").forEach((link) => {
        link.classList.remove("active");
    });

    targetSection.classList.add("active-section");

    const targetNav = document.getElementById(`nav-${pageId}`);
    if (targetNav) targetNav.classList.add("active");

    window.scrollTo({ top: 0, behavior: "auto" });
}

function searchPosts() {
    const input = document.getElementById("searchInput");
    const postsList = document.getElementById("postsList");
    const noResults = document.getElementById("noResultsMessage");

    if (!input || !postsList || !noResults) return;

    const filter = input.value.trim().toLowerCase();
    const posts = postsList.getElementsByClassName("post-card");
    const emptyMessage = document.querySelector(".empty-blog");
    let hasResults = false;

    if (posts.length === 0) return;

    for (const post of posts) {
        const title = post.querySelector("h2")?.innerText.toLowerCase() || "";
        const excerpt = post.querySelector(".excerpt")?.innerText.toLowerCase() || "";
        const matches = title.includes(filter) || excerpt.includes(filter);

        post.style.display = matches ? "flex" : "none";
        if (matches) hasResults = true;
    }

    noResults.style.display = hasResults || filter === "" ? "none" : "block";
    if (emptyMessage) emptyMessage.style.display = "none";
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImg");

    if (!lightbox || !lightboxImage || !imageSrc) return;

    lightboxImage.src = imageSrc;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImg");

    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lightboxImage) lightboxImage.src = "";
}

function updateGiscusCounters() {
    const script = document.querySelector('script[src="https://giscus.app/client.js"]');
    if (script) console.log("Giscus został załadowany.");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("nav [data-page]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const pageId = link.dataset.page;
            if (pageId) switchPage(pageId);
        });
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.addEventListener("input", searchPosts);

    document.querySelectorAll("[data-lightbox-src]").forEach((imageWrapper) => {
        imageWrapper.addEventListener("click", () => {
            openLightbox(imageWrapper.dataset.lightboxSrc);
        });
    });

    const lightbox = document.getElementById("lightbox");
    const closeButton = document.querySelector(".lightbox-close");

    if (closeButton) closeButton.addEventListener("click", closeLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeLightbox();
    });

    const posts = document.getElementsByClassName("post-card");
    const emptyMessage = document.querySelector(".empty-blog");
    if (posts.length > 0 && emptyMessage) emptyMessage.style.display = "none";

    const initialPage = window.location.hash.replace("#", "");
    if (["home", "about", "contact", "newsletter"].includes(initialPage)) {
        switchPage(initialPage);
    }

    updateGiscusCounters();
});
