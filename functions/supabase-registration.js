//import { createClient } from '@supabase/supabase-js'
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qijgsgwceoelkkycqnzt.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
//------------------------------------------------------------
const jsonMessage= require('./alert-messages.json')
//------------------------------------------------------------
const handler = async function(event, context) {
	let eve = JSON.parse(event.body)

	console.log(eve)

	// -----------------------------------------
	// 1. Registration step - from webform
	if (eve.action === "registration") {

		// create new databse record
		const email = eve.email
		const { data, error } = await supabase
			.from('newsletter')
			.insert([{email: email}])

		// send a confirmation email
		if (data) {
			let token = data[0].id
			const aa = await sendConfirmationEmail(email,token)
			returnMessage = jsonMessage.statusOk
			return {
				statusCode: 200,
				body: JSON.stringify({
					data:	token,
					message:returnMessage
				})
			}
		}

		// if the email is already in the database throw an error
		if (error) {
			returnMessage = jsonMessage.emailExist
			return {
				statusCode: 500,
				body: JSON.stringify({
					data:	error.details,
					message:returnMessage
				})
			}
		}
	}

	// -----------------------------------------
	// 2. Verification step - link click from email
	if (eve.action === "verification") {
		const token = eve.token
		const { data, error } = await supabase
			.from('newsletter')
			.update({ verified: true })
			.eq("id", token)

		if (data) {
			return {
				statusCode: 200,
				body: 		"Email verifcation"
			}
		}
		if (error) {
			return {
				statusCode: 500,
				body: 		"Supabase record update error"
			}
		}
	}
}

//	return {
//		statusCode: 200,
//		body: JSON.stringify({
//			message: 'sub',
//			data: 54
//		})
//	}
///////////////////////////////////
module.exports.handler = handler
///////////////////////////////////
let sendConfirmationEmail = async (email,token) => {
	const postmark = require("postmark")
	const emailToken =  process.env.POSTMARK_API_KEY
	const emailBody  = require('./email-templates/email-confirmation.json')
	var clientEmail = new postmark.ServerClient(emailToken);

	let emailTo = email
	let htmlB = emailBody.htmlContent.replace('LINKTOKEN',token)
	let textB = emailBody.textContent.replace('LINKTOKEN',token)
	const aa = await clientEmail.sendEmail({
		"From": emailBody.from,
		"To": emailTo,
		"Subject": emailBody.subject,
		"HtmlBody": htmlB,
		"TextBody": textB,
		"MessageStream": "outbound"
	})
		.then((res)  => res)
		.catch((err) => err)
}



