const { schedule } = require('@netlify/functions');
//// POSTMARK
const postmark = require("postmark")
const emailToken =  process.env.POSTMARK_API_KEY
const emailNewsletter = require("./send-newsletter-content.json")
const todaysDate = new Date().toISOString().substring(0,10)
const emailFrom = "5pani2pesci <no-reply@5p2p.it>"
let returnStatusCode = 400
let returnMessage = "Boh, qualcosa non è andato... non ho fatto un cazzo"

const handler = async function(event, context) {

    let title    = emailNewsletter.title
    let date     = emailNewsletter.date
    let content  = emailNewsletter.content

    let testEmail = "ruvido@gmail.com"

    const futureDate = date>todaysDate
    const sendNewsletter = date === todaysDate

    if (sendNewsletter) {

        var clientEmail = new postmark.ServerClient(emailToken);

        let emailTo = testEmail
        let htmlB = content
        //let textB = emailBody.textContent.replace('LINKTOKEN',faunaDocumentID)
        await clientEmail.sendEmail({
            "From": emailFrom,
            "To": emailTo,
            "Subject": title + " " + new Date(),
            "HtmlBody": htmlB,
            //            "TextBody": textB,
            "MessageStream": "outbound"
        })
            .then((resp) => {
                returnStatusCode = 200
                returnMessage = "Email mandate, tutto apposto"
            })
        ///    .catch((err) => {
        ///        console.log(err)
        ///        returnStatusCode = 400
        ///        returnMessage = "Errore nell'inviare il messaggio, riprova più tardi :("-
        ///    })
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
module.exports.handler = schedule("@daily", handler);
