const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = function (eleventyConfig) {

//    eleventyConfig.addGlobalData('siteUrl', 'https://localhost:8888');
    let markdownIt = require("markdown-it")
    let markdownItMark = require("markdown-it-mark");
    let emoji = require('markdown-it-emoji');
    let options = {
        html: true,
        typographer: true,
    };
    let markdownLib = markdownIt(options)
        .use(markdownItMark)
        .use(emoji)
    //let markdownLib = markdownIt(options)
  
    eleventyConfig.setLibrary("md", markdownLib);
    //markdownIt.use(emoji [, options]);
//  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
//  eleventyConfig.addWatchTarget('./styles/tailwind.css')
//
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addShortcode('version', function () {
        return now
    })

    eleventyConfig.addWatchTarget('./styles.css')
    eleventyConfig.addPassthroughCopy({
        'images': 'images',
        'styles.css': 'styles.css',
        'node_modules/@exampledev/new.css/new.css': './new.css',
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
