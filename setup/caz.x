curl -i -H "Authorization: token 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" \
    -d '{ \
        "name": "blogtest", \
        "auto_init": true, \
        "private": true, \
        "gitignore_template": "nanoc" \
      }' \
    https://api.github.com/user/repos
