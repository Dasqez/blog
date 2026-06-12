module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("moje-foto.jpeg");
  
  // To jest ten brakujący filtr daty:
  eleventyConfig.addFilter("dateFilter", function(dateVal) {
    if (!dateVal) return "";
    return new Date(dateVal).toLocaleDateString('pl-PL', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
