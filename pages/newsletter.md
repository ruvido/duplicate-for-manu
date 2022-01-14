---
title: newsletter
---

Iscriviti alla newsletter di 5pani2pesci

<form class="newsletter-subscription">
<label>Email</label>
<input type="email" name="email" />
<button type="submit">Iscriviti</button>
</form>

<script>
let formElem = document.querySelector(".newsletter-subscription")

formElem.addEventListener("submit", function(e) {
        e.preventDefault()

        let formData = new FormData(formElem)

        let payload = JSON.stringify(Object.fromEntries(formData))

        fetch(
                "/functions/newsletter-subscription",
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
