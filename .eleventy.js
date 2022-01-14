const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = function (eleventyConfig) {

    let markdownIt = require("markdown-it");
    let markdownItMark = require("markdown-it-mark");
    let options = {
        html: true
    };
    let markdownLib = markdownIt(options).use(markdownItMark);
  
  eleventyConfig.setLibrary("md", markdownLib);
//  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
//  eleventyConfig.addWatchTarget('./styles/tailwind.css')
//
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addShortcode('version', function () {
        return now
    })

    eleventyConfig.addWatchTarget('./styles.css')
    eleventyConfig.addPassthroughCopy({
        './node_modules/@exampledev/new.css/new.css': './new.css',
        './styles.css': './styles.css',
        'node_modules/offside-js/dist/offside.css': './offside.css',
        'node_modules/offside-js/dist/offside.min.js': './offside.min.js',
    })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
          ignoreCustomFragments: [ /\{\{[\s\S]*?\}\}/ ],
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
      })
      return minified
    }

    return content
  })
}
