export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("moje-foto.jpeg");

  module.exports = function(eleventyConfig) {
  // Ta linijka jest kluczowa:
  eleventyConfig.addPassthroughCopy("images");

  // AUTOMATYCZNE TWORZENIE KOLEKCJI Z FOLDERU _POSTS
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md");
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
}
