const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  // Define "post" collection from markdown files in /posts
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md");
  });

  // Add dynamic date filter for Nunjucks
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  // ✅ Add this new readableDate filter
  eleventyConfig.addFilter("readableDate", (value) => {
    return DateTime.fromJSDate(new Date(value)).toFormat("MMMM d, yyyy");
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
