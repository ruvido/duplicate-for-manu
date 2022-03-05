const { schedule } = require('@netlify/functions');
//// POSTMARK--------------------------------------/
const postmark = require("postmark")
const emailToken =  process.env.POSTMARK_API_KEY
const emailBody  = require('./newsletter-content.json')
var clientEmail = new postmark.ServerClient(emailToken);
//// FAUNA-----------------------------------------/
const faunaConfig = require('./fauna-config.json')
const faunadb = require("faunadb")
const q = faunadb.query
let client = new faunadb.Client({
    secret: process.env.FAUNA_API_KEY,
    domain: faunaConfig.domain
})
//// ( ruvido )------------------------------------/
const p = {
    //index:      "test_active_isSent",
    //collection: "test",
    index:      "people_newsletter_active_isSent",
    collection: "people",
    indexValue: [ true , false] ,
    //indexValue: [ true , true] ,
    dbSize:     100000,
    nlSize:     500,              // Newsletter batch size
    data: {
        newsletter: { isSent: true}
        //newsletter: { isSent: false}
    }
}
const email = {
    From:       "5pani2pesci <newsletter@5p2p.it>",
    Subject:    emailBody.subject,
    HtmlBody:   emailBody.content,
    //TextBody:   emailBody.content,
    MessageStream: "broadcast"
}
////////////////////////////////////////////////////
let rbody = "Non ho fatto nulla"  // response body *for debugging
const handler = async function(event, context) {
    let ppl = await client.query(
        q.Map(
            q.Paginate(q.Match(
                q.Index(p.index), p.indexValue), {"size": p.dbSize}),
            q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
        )
    )
        .then((res) => res)
    const emailRecipients = ppl.data.slice(0,p.nlSize)

    if ( emailRecipients.length > 0 ) {

        rbody = ""

        batchEmailArray = []
        await emailRecipients.forEach((ss) =>  {
            let ssEmail = JSON.parse(JSON.stringify(email))
            ssEmail.To = ss.data.email
            batchEmailArray.push(ssEmail)
        })
        await clientEmail.sendEmailBatch( batchEmailArray )
            .then(response => {
                console.log(response[0])
                console.log(response[1])
                response.forEach((ii) =>  {
                    rbody = rbody + ii.To + '\t\t ->   ' + ii.Message + '\n'
                })
            })
        await emailRecipients.forEach((ss) =>  {
            let aa = client.query(
                q.Update(
                    q.Ref(q.Collection(p.collection), ss.ref.id),
                    { data: p.data },
                )
            )
            //.then ((ret) => console.log(ss.ref.id))
                .then ((ret) => ret)
                .catch((err) => err)
            //rbody = rbody + ss.ref.id + '\n'
            //let resTxt = 'send newsletter -> '+ss.data.email
            //rbody = rbody + resTxt + '\n'
        })
    }

    return {
        statusCode: 200,
        body:       rbody
    }

}
module.exports.handler = handler
