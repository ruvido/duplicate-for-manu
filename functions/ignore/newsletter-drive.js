const buttana = require('./newsletter-send')

const handler = async function(event, context) {
    return {
        statusCode: 200,
        body:       'stocazz'
    }
}
module.exports.handler = handler

