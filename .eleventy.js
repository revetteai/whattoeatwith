const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // ✅ Copy static assets
  eleventyConfig.addPassthroughCopy("assets");

  // ✅ Copy Pagefind's generated search index
  eleventyConfig.addPassthroughCopy({ "pagefind-build": "pagefind" });

  // ✅ Copy Pagefind's required JavaScript
  eleventyConfig.addPassthroughCopy({ "node_modules/pagefind/pagefind.js": "pagefind/pagefind.js" });

  // ✅ Copy Pagefind's supporting assets (CSS, wasm, etc.)
  eleventyConfig.addPassthroughCopy({ "node_modules/pagefind/pagefind-frontend": "pagefind" });

  // ✅ Blog post collection
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md");
  });

  // ✅ Date formatting filters
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  eleventyConfig.addFilter("readableDate", (value) => {
    return DateTime.fromJSDate(new Date(value)).toFormat("MMMM d, yyyy");
  });

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
