export default function(eleventyConfig) {
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
