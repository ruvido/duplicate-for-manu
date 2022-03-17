const TESTEMAIL = false
const myTestEmail = 'ruvido@gmail.com'
//// ----------------------------------------------/
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
    //indexValue: [ true , null] ,
    dbSize:     100000,
    nlSize:     500,              // Newsletter batch size
    //nlSize:     1,              // Newsletter batch size
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
const fetchEmailRecipients = async (testing, sendToday) => {
        if (testing) {
            let ppl = await client.query(
                q.Map(
                    q.Paginate(q.Match(
                        q.Index("people_by_email"), myTestEmail)),
                    q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
                )
            )
                .then((res) => res.data.slice(0,p.nlSize))
            return ppl
        }
        if (!testing && sendToday ) {
            let ppl = await client.query(
                q.Map(
                    q.Paginate(q.Match(
                        q.Index(p.index), p.indexValue), {"size": p.dbSize}),
                    q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
                )
            )
                .then((res) => res.data.slice(0,p.nlSize))
            return ppl
        }
}
////////////////////////////////////////////////////
const today = new Date().toISOString().substring(0,10)
const handler = async function(event, context) {
    let rbody = 'ugh... qualcosa fooorse non è andato'

    let sendToday = emailBody.date === today
    const emailRecipients = await fetchEmailRecipients(TESTEMAIL, sendToday)

    if ( emailRecipients.length > 0 ) {

        rbody = ""

        batchEmailArray = []
        await emailRecipients.forEach((ss) =>  {
            let ssEmail = JSON.parse(JSON.stringify(email))
            ssEmail.To = ss.data.email
            batchEmailArray.push(ssEmail)
            // debug
            //rbody = rbody + ssEmail.To + '\n'
        })
        await emailRecipients.forEach((ss) =>  {
            let aa = client.query(
                q.Update(
                    q.Ref(q.Collection(p.collection), ss.ref.id),
                    { data: p.data },
                )
            )
                .then ((ret) => ret)
                .catch((err) => err)
        })
        await clientEmail.sendEmailBatch( batchEmailArray )
            .then(response => {
                response.forEach((ii) =>  {
                    rbody = rbody + ii.To + '\t\t ->   ' + ii.Message + '\n'
                })
            })
        return {
            statusCode: 200,
            body:       'Nuova newsletter:\n'+ rbody
        }
    }
    else {
        rbody = "Niente newsletter x oggi!"
        return {
            statusCode: 200,
            body:       rbody
        }
    }
}
module.exports.handler = handler
