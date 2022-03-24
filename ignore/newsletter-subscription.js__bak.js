const faunadb = require("faunadb")
const postmark = require("postmark")
const q = faunadb.query
const faunaDomain = 'db.fauna.com'
const faunaSecret =  process.env.FAUNA_API_KEY
const peopleCollection = 'people'
const emailToken = '0029167c-647d-4b28-a900-8524984fd692'
const emailFrom = 'no-reply@5p2p.it'


exports.handler = async function(event, context, callback) {

    // Initialize Fauna
    let client = new faunadb.Client({
        secret: faunaSecret,
        domain: faunaDomain
    })

    // Initialize Email
    var clientEmail = new postmark.ServerClient(emailToken);

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
    )
        .catch((err) => {
            console.log(err)
            return {
                statusCode: 400,
                body: "Fauna collection does not exist, error while creating it"
            }
        })

    await client.query(
        q.Paginate(q.Match(q.Index("people_by_email"), eventBody.email))
    )
        .then((ret) => {
            console.log(ret)
            return callback(null,{
                statusCode: 400,
                body: JSON.stringify({
                    message: "Fauna: Email already exist"
                })
            })
        })

//    await client.query(
//        q.If(
//            q.Paginate(q.Match(q.Index("people_by_email"), eventBody.email)),
//            'was true', 'was false')
//    )
//        .then((ret) => console.log(ret))
//        .catch((err) => console.error('Error: %s', err))


//    await client.query(
//        q.If(
//            q.Paginate(q.Match(q.Index("people_by_email"), eventBody.email))
//        ) 
//        {
//            console.log( 'cazzo questa email esiste')
//        }
//    )

    let faunaDocumentID = await client.query(
        q.Create(
            q.Collection(peopleCollection),
            { data: { email: eventBody.email, verified: false } }
        )
        //console.log('AZZZZZ'+caz)
    )
        .then((ret) => {
            console.log(ret.ref.id)
            return ret.ref.id
        })
        .catch((err) => {
            console.log(err)
            return {
                statusCode: 400,
                body: "Fauna error: cannot create new document in collection"
            }
        })

    if (1) {


        const emailBody= require('./email-templates/email-confirmation.json');

        let emailTo = eventBody.email
        let htmlB = emailBody.htmlContent.replace('LINKTOKEN',faunaDocumentID)
        let textB = emailBody.textContent.replace('LINKTOKEN',faunaDocumentID)
        await clientEmail.sendEmail({
            "From": emailBody.from,
            "To": emailTo,
            "Subject": emailBody.subject,
            "HtmlBody": htmlB,
            "TextBody": textB,
            "MessageStream": "outbound"
        })
        //        .then((response) => {
        //            console.log("success", response)
        //            return callback(null,{
        //                statusCode: 200,
        //                body: "I guess everything is good."
        //            })
        //        })
            .then((response) => {
                return callback(null,{
                    statusCode: 200,
                    body: "I guess everything is good."
                })
            })
            .catch((err) => {
                console.log(err)
                return {
                    statusCode: 400,
                    body: "Postmark error: cannot send message"
                }
            })
    }

}

