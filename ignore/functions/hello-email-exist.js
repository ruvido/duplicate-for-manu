const faunadb = require("faunadb")
const postmark = require("postmark")
const q = faunadb.query
const faunaDomain = 'db.fauna.com'
const faunaSecret =  process.env.FAUNA_API_KEY
const peopleCollection = 'people'
const emailToken = '0029167c-647d-4b28-a900-8524984fd692'
const emailFrom = 'no-reply@5p2p.it'

exports.handler = async (event, context) => {
    let eventBody = JSON.parse(event.body)

    // Initialize Fauna
    let client = new faunadb.Client({
        secret: faunaSecret,
        domain: faunaDomain
    })

    console.log(eventBody.email)
    let emailArray = await client.query(
        q.Paginate(q.Match(q.Index("people_by_email"), eventBody.email))
    )
        .then((ret) => ret)

    if (emailArray.data.length ) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'un cazzo! sti email giá esiste'
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'tutto a posto'
        })
    }
}
