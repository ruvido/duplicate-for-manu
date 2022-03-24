const settings = require('./server-settings.js')
const faunadb  = require("faunadb")

const q = faunadb.query
// Initialize Fauna
let client = new faunadb.Client({
    secret: settings.fauna.secret,
    domain: settings.fauna.domain
})

const collectionName = 'stocaz'

const handler = async () => {
    if (0) {
        client.query(
            q.CreateIndex({
                name: "all_stocaz",
                source: q.Collection(collectionName)
            })
        )
    }

    client.query(q.Paginate(q.Match(q.Index("all_stocaz"))))
    .then((res) => console.log(res.data.length))

} 

handler ()
