const faunadb = require("faunadb")
const q = faunadb.query
const faunaDomain = 'db.fauna.com'
const faunaSecret =  process.env.FAUNA_API_KEY
const peopleCollection = 'people'
const postmarkToken = '0029167c-647d-4b28-a900-8524984fd692'

exports.handler = async function(event, context, callback) {

    // Initialize Fauna
    let client = new faunadb.Client({
        secret: faunaSecret,
        domain: faunaDomain
    })

    // The content is contained in the event body.
    // Parse it, and if the parsing fails, return a 400 status message.
    let eventBody = null

    try {
        eventBody = JSON.parse(event.body)
        console.log(eventBody)
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

    //    if email exist!
//    const doesDocExist = await client.query(
//    q.Exists(q.Match(q.Index('likes_by_slug'), slug))
//  );
//
    // create Collection if does not exist
    await client.query(
        q.If(
            q.Exists(q.Collection(peopleCollection)),
            null,
            q.CreateCollection({ name: peopleCollection })
        )
    ).catch((err) => console.log(err))

    await client.query(
        q.Create(
            q.Collection(peopleCollection),
            { data: { email: eventBody.email, verified: false } }
        )
    )
        .then((response) => {
            console.log("success", response)
            return callback(null,{
                statusCode: 200,
                body: "I guess everything is good. Now must send an email for double opt-in"
            })
        })
        .catch((err) => console.log(err))


//    return {
//        statusCode: 200,
//        body: "I guess everything is good. BBUUUUUuuurpPPPP"
//    }
}

