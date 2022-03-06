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
    //dbSize:     100000,
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
const today = new Date().toISOString().substring(0,10)
const handler = async function(event, context) {

    if (emailBody.date === today ) {
        rbody = "true"
    } else {
        rbody = "false"
    }

    return {
        statusCode: 200,
        body:       rbody
    }

}
module.exports.handler = handler
