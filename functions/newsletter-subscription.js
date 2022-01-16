const faunadb = require("faunadb")
const q = faunadb.query

exports.handler = async function(event, context) {

    // The content of the comment is contained in the event body.
    // Parse it, and if the parsing fails, return a 400 status message.
    let eventBody = null

    try {
        eventBody = JSON.parse(event.body)
    } catch(e) {
        console.log(`ERROR: Invalid JSON - ${e.message}`)
        return {
            statusCode: 400,
            body: "Request body must comprise a valid JSON string."
        }
    }

    // Ensure it contains the relevant pieces
    //if (!(eventBody.submitter && eventBody.body && eventBody.post_slug && eventBody.post_title)) {
    if (!(eventBody.email)) {
        console.log(`ERROR - Email field not defined.`)
        return {
            statusCode: 400,
            body: "Email field not defined. event body must contain the field 'email'"
        }
    }

    let client = new faunadb.Client({secret: process.env.FAUNA_API_KEY})

    await client.query(q.Call('email_subscription_to_newsletter', eventBody))


    return {
        statusCode: 200,
        body: "I guess everything is good."
    }
}

