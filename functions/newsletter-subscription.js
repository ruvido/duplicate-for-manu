////////////////////////
const DEBUGMODE = true
////////////////////////
const faunadb = require("faunadb")
const postmark = require("postmark")
const q = faunadb.query
const faunaSecret =  process.env.FAUNA_API_KEY
// ruvido> MOVE THESE TO a fauna-config.json (in functions folder)
const faunaDomain = 'db.fauna.com'
const peopleCollection = 'people'
// ruvido> MOVE THIS TO ENV
const emailToken = '0029167c-647d-4b28-a900-8524984fd692'
const emailBody  = require('./email-templates/email-confirmation.json')

// ruvido> MOVE ALL MESSAGES to default-messages.json (in functions)
const jsonMessage= require('./alert-messages.json')
///const jsonMessage = {
///    statusOk: '<strong>Perfetto!</strong> Ti abbiamo inviato una email, <strong>aprila</strong> per <strong>convalidare</strong> la tua iscrizione',
///    statusFail: 'Qualcosa non ha funzionato... riprova più tardi',
///    emailExist: '<strong>Questa email è già registrata!</strong> Controlla la **Spam**  se non ricevi i nostri messaggi'
///}

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
            if (ret.data.length <1) return null
            //return ret.data[0].ref.id
            return ret.data[0].id
        })

    if ( 1 ) {
        if (faunaDocumentID) {
            returnStatusCode = 200
            returnMessage = jsonMessage.emailExist
            emailAlreadyExist = true
        }
        else {
            faunaDocumentID = await client.query(
                q.Create(
                    q.Collection(peopleCollection),
                    { data: { email: eventBody.email, verified: false } }
                )
            )
                .then((ret) => {
                    console.log(ret.ref.id)
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

    if (1) {

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
