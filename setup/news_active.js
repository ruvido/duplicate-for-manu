const settings = require('./server-settings.js')
const faunadb  = require("faunadb")

const q = faunadb.query
// Initialize Fauna
let client = new faunadb.Client({
    secret: settings.fauna.secret,
    domain: settings.fauna.domain
})

const showsub = async () => {
    var subs = await client.query(
        q.Map(
            //q.Paginate(q.Match(q.Index("people_active"), true)),
            q.Paginate(q.Match(q.Index("test_active"),true), {"size": 10}),
            q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
        )
    )
        .then((res) => res.data)


    let notVerified = 0
    //for (const ss in subs) {subs[ss].data.verified ? verified+=1 : null}
    subs.forEach((ss) =>  console.log(ss.data.newsletter))

} 

showsub()
