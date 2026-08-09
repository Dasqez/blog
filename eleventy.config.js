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
    const match = String(content || "").match(
      /<!--\s*cms-tags:\s*(\[[\s\S]*?\])\s*-->/i
    );
    if (!match) return [];

    try {
      const tags = JSON.parse(match[1]);
      return Array.isArray(tags)
        ? [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))]
        : [];
    } catch {
      return [];
    }
  });

  eleventyConfig.addFilter("postSeo", function(content) {
    const source = String(content || "").replace(/^\s*<!--\s*cms-tags:[\s\S]*?-->\s*/i, "");
    const match = source.match(/^\s*<!--\s*cms-seo:\s*(\{[\s\S]*?\})\s*-->/i);
    if (!match) return {};
    try { return JSON.parse(match[1]) || {}; } catch { return {}; }
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
