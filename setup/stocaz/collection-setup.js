const settings = require('./server-settings.js')
const faunadb  = require("faunadb")

const q = faunadb.query
// Initialize Fauna
let client = new faunadb.Client({
    secret: settings.fauna.secret,
    domain: settings.fauna.domain
})

let nVer = 10
let nNov = 2
const collectionName = 'stocaz'
const data = {
    email: "",
    verified: true,
    newsletter: {
        active: true,
        isSent: false
    }
}

const handler = async () => {

    let  collectionExist = await client.query(
        q.Exists(q.Collection(collectionName))
    )
        .then((ret) => ret)

    ///if (collectionExist) {
    ///    console.log('... deleting collection')
    ///    client.query(q.Delete(q.Collection(collectionName)))
    ///}
    console.log('New collection created: '+collectionName)
    await client.query(q.CreateCollection({name: collectionName}))
    //.then((res)=> console.log('ok'))

    let cc=0
    for (let ii = 1; ii <= nVer+nNov; ii++) {
        cc++
        let newData = JSON.parse(JSON.stringify(data));
        newData.email = 'ruvido+'+ii+'@gmail.com'
        if (cc>nVer) newData.verified = false
        await client.query(q.Create(q.Collection(collectionName),
            { data: newData })
        )
            .then((res) => console.log('new data created: '+newData.email))
    }

} 

handler ()
