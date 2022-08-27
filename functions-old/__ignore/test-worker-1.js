const { schedule } = require('@netlify/functions');
const work = require('./test.js')
const handler = async function(event, context) {
    let resp = await work.handler()
    return {
        statusCode: resp.statusCode,
        body:       resp.body
    }
}
module.exports.handler = handler
