const faunadb = require("faunadb")
const q = faunadb.query

exports.handler = async function(event, context, callback) {

    // The content is contained in the event body.
    // Parse it, and if the parsing fails, return a 400 status message.
    let eventBody = null

    try {
        eventBody = JSON.parse(event.body)
        console.log(eventBody)
        console.log(eventBody.ref)
    } catch(e) {
        console.log(`ERROR: Invalid JSON - ${e.message}`)
        return {
            statusCode: 400,
            body: "Request body must comprise a valid JSON string."
        }
    }


    let client = new faunadb.Client({
        secret: process.env.FAUNA_API_KEY,
        domain: 'db.fauna.com'
    })

//    const doesDocExist = await client.query(
//    q.Exists(q.Match(q.Index('likes_by_slug'), slug))
//  );
//

    await client.query(
        q.Update(
            q.Ref(q.Collection('Todos'), eventBody.ref),
            { data: { tags: ['pet', 'cute'] } },
        )
    )
    //    .then((ret) => console.log(ret))
        .then((response) => {
            console.log("success", response)
            return callback(null,{
                statusCode: 200,
                body: "I guess everything is good."
            })
        }).catch((err) => console.log(err))



////    await client.query(
////        q.If(
////            q.Exists(q.Collection('Todos')),
////            null,
////            q.CreateCollection({ name: 'Todos' })
////        )
////    ).catch((err) => console.log(err))
////
////    const value = 'mavaff'
////    await client.query(
////        q.Create(
////            q.Collection('Todos'),
////            { data: { todo: value, done: false } }
////        )
////    ).then((response) => {
////        console.log("success", response)
////        return callback(null,{
////            statusCode: 200,
////            body: "I guess everything is good."
////        })
////    }).catch((err) => console.log(err))
////

//    return {
//        statusCode: 200,
//        body: "I guess everything is good. BBUUUUUuuurpPPPP"
//    }
}

