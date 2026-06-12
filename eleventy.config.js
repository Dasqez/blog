export default function(eleventyConfig) {
  // Przekazywanie folderu panelu administratora
  eleventyConfig.addPassthroughCopy("admin");

  // Przekazywanie pojedynczego pliku (jeśli jest w katalogu głównym)
  eleventyConfig.addPassthroughCopy("moje-foto.jpeg");

  eleventyConfig.addPassthroughCopy("favicon.png");

  // KLUCZOWE: Przekazywanie całego folderu assets wraz z obrazkami z CMS
  eleventyConfig.addPassthroughCopy("images");

  // AUTOMATYCZNE TWORZENIE KOLEKCJI Z FOLDERU _POSTS
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md").reverse();
  });

  eleventyConfig.setFrontMatterParsingOptions({
  excerpt: true,
  excerpt_separator: `` // To będzie Twój "przycisk stopu" w treści
});

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
}
