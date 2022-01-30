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

exports.handler = async (event, context) => {
    let eventBody = JSON.parse(event.body)
    // ruvido> MOVE ALL MESSAGES to default-messages.json (in functions)
    let returnMessage = 'Qualcosa non ha funzionato... riprova più tardi'

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

    let emailArray = await client.query(
        q.Paginate(q.Match(q.Index("people_by_email"), eventBody.email))
    )
        .then((ret) => ret)

///    if (emailArray.data.length ) {
///        return {
///            statusCode: 400,
///            body: JSON.stringify({
///                message: 'un cazzo! sti email giá esiste'
///            })
///        }
///    }
    if (emailArray.data.length ) {
        // ruvido> MV this
        returnMessage = 'Hai già registrato la tua email, se non ricevi i nostri messaggi controlla in Spam' 
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: returnMessage,
            data: emailArray.data 
        })
    }
}
