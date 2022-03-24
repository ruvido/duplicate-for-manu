# Project setup

In this folder all scripts relevant to setup the projects must be included

## Fauna
- create all relevant collections
- create all relevant indexes

    // create Collection if does not exist
    await client.query(
        q.If(
            q.Exists(q.Collection(peopleCollection)),
            null,
            q.CreateCollection({ name: peopleCollection })
        )
    )
        .catch((err) => {
            console.log(err)
            return {
                statusCode: 400,
                body: "Fauna collection does not exist, error while creating it"
            }
        })

