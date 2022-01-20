---
title: Si inizia da qui
permalink: "/"
layout: base-noNavbar.njk
---
<article>

Lorem ipsum amet sic dolor.

<form class="newsletter-subscription">
<div style="display:flex; flex-direction: row">
<input type="email" name="email" />
<button type="submit">Iscriviti</button>
</div>
</form>


</article>

<article>

Lorem ipsum amet sic dolor.
Lorem ipsum amet sic dolor.
Lorem ipsum amet sic dolor.
Lorem ipsum amet sic dolor.
Lorem ipsum amet sic dolor.

</article>


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
