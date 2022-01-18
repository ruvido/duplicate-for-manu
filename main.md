---
title: Si inizia da qui
permalink: "/"
layout: basenav.njk
---

# Lorem ipsum amet

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

<form class="newsletter-subscription">
<input type="email" name="email" />
<button type="submit">Iscriviti</button>
</form>

<script>
let formElem = document.querySelector(".newsletter-subscription")

formElem.addEventListener("submit", function(e) {
        e.preventDefault()

        let formData = new FormData(formElem)

        let payload = JSON.stringify(Object.fromEntries(formData))

        console.log(payload)
        fetch(
                "/.netlify/functions/newsletter-subscription",
                {
method: "POST",
body: payload,
headers: {'Content-Type': 'application/json;charset=utf-8'}
}
)
        .then(resp => {
            console.log(resp)
            })


        })
</script>
