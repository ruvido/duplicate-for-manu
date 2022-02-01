////////////////////////
const DEBUGMODE = true
const CREATERECORD = true
const SENDEMAIL = false
////////////////////////
const jsonMessage= require('./alert-messages.json')

//// FAUNA
const faunaSecret =  process.env.FAUNA_API_KEY
const faunaConfig = require('./fauna-config.json')
const faunadb = require("faunadb")
const q = faunadb.query
const faunaDomain = faunaConfig.domain
const peopleCollection = faunaConfig.people

//// POSTMARK
const postmark = require("postmark")
const emailToken =  process.env.POSTMARK_API_KEY
const emailBody  = require('./email-templates/email-confirmation.json')

exports.handler = async (event, context) => {
    let eventBody = JSON.parse(event.body)
    let returnMessage = jsonMessage.statusFail
    let returnStatusCode = 400

    // Initialize Fauna
    let client = new faunadb.Client({
        secret: faunaSecret,
        domain: faunaDomain
    })

    if (DEBUGMODE) {
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
    }

    let emailAlreadyExist = false
    let faunaDocumentID = await client.query(
        q.Paginate(q.Match(q.Index("people_by_email"), eventBody.email))
    )
        .then((ret) => {
            //        console.log('vediamo se lemail esiste gia')
            if (ret.data.length <1) return null
            //return ret.data[0].ref.id
            return ret.data[0].id
        })
        .catch((err) => {
            console.log(err)
            returnStatusCode = 400
            returnMessage = "Fauna error: unable to check email record"
        })

    if (CREATERECORD) {
        if (faunaDocumentID) {
                    // console.log('!!!! email gia registrata')
            returnStatusCode = 200
            returnMessage = jsonMessage.emailExist
            emailAlreadyExist = true
        }
        else {
                    // console.log('nuova email')
            faunaDocumentID = await client.query(
                q.Create(
                    q.Collection(peopleCollection),
                    { data: { email: eventBody.email, verified: false } }
                )
            )
                .then((ret) => {
                    // console.log(ret.ref.id)
                    returnStatusCode = 200
                    returnMessage = jsonMessage.statusOk
                    faunaDocumentID = ret.ref.id
                    return ret.ref.id
                })
                .catch((err) => {
                    console.log(err)
                    returnStatusCode = 400
                    returnMessage = "Fauna error: cannot create new document in collection"
                })
        }
    }

    if (SENDEMAIL) {

        var clientEmail = new postmark.ServerClient(emailToken);

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
            .catch((err) => {
                console.log(err)
                returnStatusCode = 400
                returnMessage = "Postmark error: cannot send message" 
            })
    }


    return {
        statusCode: returnStatusCode,
        body: JSON.stringify({
            message: returnMessage,
            data: faunaDocumentID
        })
    }
}
