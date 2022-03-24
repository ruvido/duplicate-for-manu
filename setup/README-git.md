## GIT setup x
    
    # list all branches
    git branch -a

    # create new branch
    git checkout -b devel

    # first time you push
    git push -u origin devel

    # go back to master and merge changes
    git checkout master
    git merge devel
    git push

    # delete the branch
    git push -d origin devel
    git branch -d devel

