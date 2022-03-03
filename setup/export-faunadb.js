const settings = require('./server-settings.js')
const faunadb  = require("faunadb")

const q = faunadb.query
// Initialize Fauna
let client = new faunadb.Client({
    secret: settings.fauna.secret,
    domain: settings.fauna.domain
})

const exportFaunaDB = async () => {
    await client.query(
        q.Map(
            //q.Paginate(q.Match(q.Index("people_active"), true)),
            q.Paginate(q.Match(q.Index("all_subscribed")), {"size": 10000}),
            q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
        )
    )
        .then((res) => {
            console.log('[')
            res.data.forEach((ss) =>  {
                //console.log(ss.data)
                console.log(JSON.stringify(ss))
                console.log(',')
            })
            console.log(']')
        })
} 

exportFaunaDB()
