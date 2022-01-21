---
title: We're back!
permalink: "/"
layout: base-noNavbar.njk
---
<article>

<h1>{{title}}</h1>

***5PANI2PESCI*** ritorna in maniera del tutto nuova. Iscriviti alla **newsletter** settimanale e ti avvertiremo appena saremo pronti. 

***#daje!***

<form class="newsletter-subscription">
<div style="display:flex; flex-direction: row">
<input type="email" name="email" placeholder="la tua email"/>
<button type="submit">Iscriviti</button>
</div>
</form>

<center>
<small>
<a class="angle" href="https://5p2p.it">
Torna al vecchio Blog di 5pani2pesci</a></small>
</center>


</article>

<article>

## Perchè questo cambiamento?
Ne parliamo da tanto, ma ora -- con le idee più chiare -- stiamo mettendo insieme tutto quanto per iniziare una nuova esperienza.


Stiamo lavorando su tanti aspetti del progetto, in particolare vogliamo dare la possibilità di consultare tutti i nostri contenuti in un solo luogo, che sia semplice e fruibile. 

Inoltre, dalle prossime settimane affiancheremo al <b>podcast</b> <strong>#gratefulmonday</strong> una <b>newsletter</b> settimanale per poter leggere i nostri approfondimenti in maniera regolare e direttamente dalla tua casella di posta.

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
