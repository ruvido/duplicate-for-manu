const settings = require('./server-settings.js')
const faunadb  = require("faunadb")
const ruvidoIndex = "newsletter_active"
const ruvidoCollection = "people"
const ruvidoIndexValue = true
const paginateSize = 100

const q = faunadb.query
// Initialize Fauna
let client = new faunadb.Client({
    secret: settings.fauna.secret,
    domain: settings.fauna.domain
})

const updateData = (content) => { client.query(
    q.Update(
        q.Ref(q.Collection(ruvidoCollection), content.ref.id),
        { data: content.data },
    )
)
//    .then((ret) => console.log(ret))
    .then((response) => {
        console.log("success", response)
        return {
            statusCode: 200,
            body: "I guess everything is good."
        }
    }).catch((err) => console.log(err))
}


const job = async () => {
    await client.query(
        q.Map(
            //q.Paginate(q.Match(q.Index("people_active"), true)),
            q.Paginate(q.Match(q.Index(ruvidoIndex), ruvidoIndexValue), {"size": paginateSize}),
            q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
        )
    )
        .then((res) => {
            //console.log('[')
            res.data.forEach((ss) =>  {
                //console.log(ss.ref)
                console.log(ss.ref.id)
                //console.log(ss.ref.collection)
                //ss.data = {
                //    newsletter: {
                //        isSent: false
                //    }
                //}
                //updateData(ss)
            })
        })
} 

job()
