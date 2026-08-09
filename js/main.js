"use strict";

const LOCAL_SETTINGS_PREVIEW_KEY = "cms-local-site-settings-preview";

function applyLocalSettingsPreview(settings) {
    if (!settings || !["localhost", "127.0.0.1"].includes(window.location.hostname)) return;

    const visibility = settings.visibility || {};
    const socialVisibility = visibility.social || {};
    const siteName = document.getElementById("siteName");
    const siteSlogan = document.getElementById("siteSlogan");
    const siteLogo = document.getElementById("siteLogo");
    const siteFavicon = document.getElementById("siteFavicon");
    const siteSocial = document.getElementById("siteSocial");

    document.documentElement.dataset.theme = settings.theme || "light";
    if (siteName) { siteName.textContent = settings.name || ""; siteName.hidden = visibility.name === false; }
    if (siteSlogan) { siteSlogan.textContent = settings.slogan || ""; siteSlogan.hidden = visibility.slogan === false; }

    if (siteLogo) {
        const hasLogo = Boolean(settings.logo);
        const source = hasLogo ? settings.logo : settings.favicon;
        const visible = hasLogo ? visibility.logo !== false : visibility.favicon !== false;
        siteLogo.src = source || "";
        siteLogo.alt = hasLogo ? (settings.name || "Logo bloga") : "";
        siteLogo.hidden = !source || !visible;
        siteLogo.classList.toggle("site-favicon-logo", !hasLogo);
    }

    if (siteFavicon) {
        if (settings.favicon && visibility.favicon !== false) siteFavicon.href = settings.favicon;
        else siteFavicon.removeAttribute("href");
    }

    document.querySelectorAll("[data-site-social]").forEach((link) => {
        const network = link.dataset.siteSocial;
        const href = settings.social?.[network] || "";
        link.href = href || "#";
        link.hidden = !href || socialVisibility[network] === false;
    });
    if (siteSocial) siteSocial.hidden = !siteSocial.querySelector("a:not([hidden])");
}

function loadLocalSettingsPreview() {
    if (!["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
    try {
        applyLocalSettingsPreview(JSON.parse(localStorage.getItem(LOCAL_SETTINGS_PREVIEW_KEY) || "null"));
    } catch (error) {
        console.warn("Nie udało się wczytać lokalnego podglądu ustawień.", error);
    }
}

window.addEventListener("storage", (event) => {
    if (event.key === LOCAL_SETTINGS_PREVIEW_KEY && event.newValue) {
        try { applyLocalSettingsPreview(JSON.parse(event.newValue)); } catch { /* pomiń niepoprawny podgląd */ }
    }
});

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
    loadLocalSettingsPreview();
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
