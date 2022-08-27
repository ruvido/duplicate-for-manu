const { schedule } = require('@netlify/functions');
//// POSTMARK
const postmark = require("postmark")
const emailToken =  process.env.POSTMARK_API_KEY
const emailNewsletter = require("./send-newsletter-content.json")
const todaysDate = new Date().toISOString().substring(0,10)
let returnStatusCode = 400
let returnMessage = "Boh, qualcosa non è andato... non ho fatto un cazzo"

const handler = async function(event, context) {

    let emailFrom= "5pani2pesci <newsletter@5p2p.it>"
    let title    = emailNewsletter.title
    let date     = emailNewsletter.date
    let content  = emailNewsletter.content

    let testEmail = "ruvido@gmail.com"

    const futureDate = date>todaysDate
    const sendNewsletter = date === todaysDate

    if (sendNewsletter) {

        var client = new postmark.ServerClient(emailToken);

        let emailTo = testEmail
        let htmlB = content

        // max 500 messages
        await client.sendEmailBatch(
            [
                {
                    From: emailFrom,
                    To: "ruvido+1@gmail.com",
                    Subject: "* first email",
                    HtmlBody: "test body",
                    MessageStream: "broadcast"
                },
                {
                    From: emailFrom,
                    To: "ruvido+2@gmail.com",
                    Subject: "* second email",
                    TextBody: "test",
                    MessageStream: "broadcast"
                }
            ]
        )

        //await client.sendEmail({
        //    "From": emailFrom,
        //    "To": emailTo,
        //    "Subject": emailTo +  " " + new Date().getMinutes(),
        //    "HtmlBody": htmlB,
        //    //            "TextBody": textB,
        //    "MessageStream": "broadcast"
        //})
            .then((resp) => {
                returnStatusCode = 200
                returnMessage = "Email mandate, tutto apposto"
            })
            .catch((err) => {
                console.log(err)
                returnStatusCode = 400
                returnMessage = 
                    "Errore nell'inviare il messaggio, riprova più tardi :("
            })
    }
    else {
        returnStatusCode = 200
        returnMessage = "Nessuna newsletter pianificata"
        if (futureDate) returnMessage = "Email pianificata per il giorno "+date
    }


    return {
        //headers : {'Content-Type': 'application/json'},
        //body:       JSON.stringify(returnMessage)
        headers: {'Content-Type': 'text/html; charset=UTF-8'},
        statusCode: returnStatusCode,
        body:       returnMessage
        //        body: title + "\n" +
        //        "\n    futureDate:     "+futureDate +
        //        "\n    sendNewsletter: "+sendNewsletter
    }
}
//module.exports.handler = schedule("0 6 * * *", handler);
module.exports.handler = handler
