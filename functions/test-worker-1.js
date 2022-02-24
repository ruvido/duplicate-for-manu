const { schedule } = require('@netlify/functions');
const work = require('./test.js')
const handler = async function(event, context) {
    await work.handler()
}
module.exports.handler = handler
