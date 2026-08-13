function parseCmsMetadata(content) {
  let body = String(content || "");
  const metadata = {};
  const pattern = /^\s*<!--\s*cms-(status|tags|seo):\s*([\s\S]*?)\s*-->\s*/i;
  let match;
  while ((match = body.match(pattern))) {
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === "status") metadata.status = value.toLowerCase();
    else { try { metadata[key] = JSON.parse(value); } catch { metadata[key] = key === "tags" ? [] : {}; } }
    body = body.slice(match[0].length);
  }
  return { metadata, body };
}

function getPostTags(content) {
  const tags = parseCmsMetadata(content).metadata.tags;
  return Array.isArray(tags) ? [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))] : [];
}

export default function(eleventyConfig) {
  eleventyConfig.addPreprocessor("cms-draft-posts", ["md"], function(data, content) {
    const normalizedPath = String(this.inputPath || "").replace(/\\/g, "/");
    if (!normalizedPath.startsWith("./_posts/") && !normalizedPath.startsWith("_posts/")) return;
    if (/<!--\s*cms-status:\s*draft\s*-->/i.test(String(content || ""))) return false;
  });

  eleventyConfig.addFilter("readingTime", function(content) {
    const plainText = String(content || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[[^\]]+\]\([^)]*\)/g, " ")
      .replace(/[`*_>#~-]/g, " ");
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  eleventyConfig.addFilter("postTags", function(content) {
    return getPostTags(content);
  });

  eleventyConfig.addFilter("relatedPosts", function(posts, currentUrl, currentTags = [], limit = 3) {
    const normalizedTags = new Set((Array.isArray(currentTags) ? currentTags : [])
      .map((tag) => String(tag).trim().toLowerCase()).filter(Boolean));
    return (Array.isArray(posts) ? posts : [])
      .filter((post) => post.url !== currentUrl)
      .map((post) => {
        const tags = Array.isArray(post.data?.tags) ? post.data.tags : getPostTags(post.templateContent);
        const score = tags.reduce((total, tag) => total + (normalizedTags.has(String(tag).toLowerCase()) ? 1 : 0), 0);
        return { post, score };
      })
      .filter(({ score }) => normalizedTags.size === 0 || score > 0)
      .sort((left, right) => right.score - left.score || right.post.date - left.post.date)
      .slice(0, Number(limit) || 3)
      .map(({ post }) => post);
  });

  eleventyConfig.addFilter("postSeo", function(content) {
    const seo = parseCmsMetadata(content).metadata.seo;
    return seo && typeof seo === "object" && !Array.isArray(seo) ? seo : {};
  });

  eleventyConfig.addFilter("seoDescription", function(content) {
    return String(content || "")
      .replace(/<!--\s*cms-(?:tags|seo):[\s\S]*?-->/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_>#~-]/g, " ")
      .replace(/\s+/g, " ").trim().slice(0, 160);
  });

  eleventyConfig.addFilter("absoluteUrl", function(value, base = "https://minimalistycznie.pages.dev") {
    try { return new URL(String(value || ""), String(base || "https://minimalistycznie.pages.dev")).href; }
    catch { return "https://minimalistycznie.pages.dev/"; }
  });

  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value == null ? "" : value).replace(/</g, "\\u003c");
  });

  // Przekazywanie folderu panelu administratora
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addPassthroughCopy("admin/js");

  // Przekazywanie pojedynczego pliku
  eleventyConfig.addPassthroughCopy("moje-foto.jpeg");

  eleventyConfig.addPassthroughCopy("favicon.png");

  // Przekazywanie obrazków
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets");

  // DODAJ TE DWIE LINIE
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  // AUTOMATYCZNE TWORZENIE KOLEKCJI Z FOLDERU _POSTS
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md").reverse();
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- more -->"
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
}
