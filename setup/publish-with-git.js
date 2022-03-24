var GitHubPublisher = require('github-publish');
const ghToken = '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'

var publisher = new GitHubPublisher( ghToken, 'ruvido', 'github.com/ruvido/newCss');

publisher.publish('caz.md', 'file content', {message: 'caz'}).then(function (result) {
  // If "result" is truthy then the post was successfully published
});
