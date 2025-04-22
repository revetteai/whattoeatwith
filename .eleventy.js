module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  // Define "post" collection from markdown files in /posts
  eleventyConfig.addCollection("post", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md");
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
