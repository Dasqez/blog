export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("moje-foto.jpeg");

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
}
