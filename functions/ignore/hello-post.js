const querystring = require("querystring");

exports.handler = async (event, context) => {
    let eventBody = JSON.parse(event.body)
    console.log('scaccccola')
    console.log(eventBody)
    console.log('scaccccola')
    return {
        statusCode: 200,
        body: JSON.stringify({
            text: 'boh' + eventBody.email
        })
    };
};
