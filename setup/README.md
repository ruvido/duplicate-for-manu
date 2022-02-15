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

## GIT setup
    
    # list all branches
    git branch -a

    # create new branch
    git checkout -b develop

    # first time you push
    git push -u origin develop

    # go back to master and merge changes
    git checkout master
    git merge develop
    git push

    # delete the branch
    git push -d origin develop
    git branch -d develop

