---
title: Lorem ipsum sit amet
permalink: "/"
layout: base-noNavbar.njk
---
<article>

<h1>{{title}}</h1>

Lorem ipsum dolor sit amet, [consectetur]() adipiscing elit, sed do [eiusmod]() tempor incididunt ut labore et dolore magna aliqua.

<form class="newsletter-subscription">
<div style="display:flex; flex-direction: row">
<input type="email" name="email" placeholder="la tua email"/>
<button type="submit">Iscriviti</button>
</div>
</form>

<center>
<small>
<a class="angle" href="">
fammi dare un'occhiata</a></small>
</center>


</article>

<article>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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
