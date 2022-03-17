const settings = require('./server-settings.js')
const faunadb  = require("faunadb")

const q = faunadb.query
// Initialize Fauna
let client = new faunadb.Client({
    secret: settings.fauna.secret,
    domain: settings.fauna.domain
})

const job = async () => {
    await client.query(
        q.CreateIndex({
            name: "test_newsletter_active",
            source: q.Collection("test"),
            terms: [
                { field: ["data", "newsletter.active"]}
            ]
        })
    )
        .then((resp) => {
            console.log(resp)
        })
        .catch((err) => {
            console.log(err)
        })
} 

job()
