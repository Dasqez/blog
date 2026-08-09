export default function(eleventyConfig) {
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
