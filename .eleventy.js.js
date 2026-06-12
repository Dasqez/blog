module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("moje-foto.jpeg");

  eleventyConfig.addFilter("dateFilter", function(dateVal) {
    return new Date(dateVal).toLocaleDateString('pl-PL', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  });

  return { dir: { input: ".", output: "_site" } };
};