const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Copy assets and pagefind index
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("pagefind");

  // Define "post" collection from markdown files in /posts
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md");
  });

  // Add dynamic date filter for Nunjucks
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  // Readable date format (e.g., April 23, 2025)
  eleventyConfig.addFilter("readableDate", (value) => {
    return DateTime.fromJSDate(new Date(value)).toFormat("MMMM d, yyyy");
  });

  // Year-only for footer
  eleventyConfig.addFilter("year", () => {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk"
  };
};
