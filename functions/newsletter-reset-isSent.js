const { schedule } = require('@netlify/functions');
//// FAUNA
const faunaConfig = require('./fauna-config.json')
const faunadb = require("faunadb")
const q = faunadb.query
let client = new faunadb.Client({
    secret: process.env.FAUNA_API_KEY,
    domain: faunaConfig.domain
})
////////////////////////////////////////////////////
const p = {
    index:      "newsletter_active",
    indexValue: true,
    size:       10000,
    collection: "people",
    data: {
        newsletter: { isSent: false}
    }
}
////////////////////////////////////////////////////
const handler = async function(event, context) {
    let ppl = await client.query(
        q.Map(
            q.Paginate(q.Match(
                q.Index(p.index), p.indexValue), {"size": p.size}),
            q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
        )
    )
        .then((res) => res)
    let rbody = ""
    await ppl.data.forEach((ss) =>  {
        let aa = client.query(
            q.Update(
                q.Ref(q.Collection(p.collection), ss.ref.id),
                { data: p.data },
            )
        )
            .then ((ret) => ret)
            .catch((err) => err)
        rbody = rbody + ss.ref.id + '\n'
    })

    return {
        statusCode: 200,
        body:       rbody
    }
}
module.exports.handler = handler
