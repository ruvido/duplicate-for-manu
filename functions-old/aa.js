//import { createClient } from '@supabase/supabase-js'
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qijgsgwceoelkkycqnzt.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
//------------------------------------------------------------
const handler = async function(event, context) {
    let eve = JSON.parse(event.body)
	console.log(eve)

	//const email = eve.email
	//if (eve.action === "subscription") {
	//	console.log(email+"sub")
	//}
	//if (eve.action === "verification") {
	//	console.log(email+"ver")
	//}
	return {
		statusCode: 200,
        body: JSON.stringify({
            message: "oook",
            data: 45
        })
	}
}
///////////////////////////////////
module.exports.handler = handler
///////////////////////////////////
