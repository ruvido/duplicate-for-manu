---
title: We're back! 💪
permalink: "/"
layout: base-noNavbar.njk
---
<article>

<h1>{{title}}</h1>

***5PANI2PESCI*** ritorna! 

Arriva la **newsletter** ⭐ e tante altre cosette belle. 
Iscriviti e ti avviseremo appena siamo pronti!

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

Ne parliamo da tanto e --- *incredibilmente* --- eccoci qui per un vero e proprio
*restyling* di ***5PANI2PESCI***. Che dire... ce n'é voluto di tempo ma alla
fine eccoci qui :D

Ripensando a questi anni, abbiamo fatto veramente tanta strada insieme: momenti
di gioia, di silenzio, grandi novità, pandemie (!) sempre con il pensiero a
sviluppare contenuti freschi e autentici per condividere il desiderio di
sperimentare una vita piena, fondata sull'esperienza viva ed autentica con Dio.

La tempesta covid e le difficoltà sempre più crescenti ad organizzare incontri
faccia-a-faccia ci ha avvicinato in maniera sempre più sostanziale a
piattaforme come [YouTube]() e [Instagram](). Da qui sono nati contenuti nuovi
e belli come il cammino sui [Nuclei di Morte]() ed il libro di Alessandra [Trombamica d'eccezione]() --- bestseller su Amazon ***#tantaRobbba*** 

Questa esperienza ci ha insegnato nuovi modi di interagire attraverso i video
settimanali, le Live *domande&risposte*, gli innumerevoli messaggi sui social
ed infine ***#gratefulmonday*** un [podcast settimanale]() che è diventato
appuntamento fisso, nonchè  canale di scambio e crescita bellissimo. Nel 2013
abbiamo iniziato con un semplice blog ed ora ***5PANI2PESCI*** è diventata una
vera e propria community!

È stupendo, perchè tutto questo è stato possibile innanzitutto **grazie a voi**, al
vostro sostegno, alla vostra pazienza nei nostri momenti di silenzio, nella
voglia di mettersi in discussione e di crescere, nel desiderio grande di volare
alto!

Ora sentiamo forte il desiderio di fare **ordine**, di mettere insieme tutto il
lavoro svolto sui social, nelle piattaforme di streaming e sul blog e renderlo
un materiale facilmente fruibile, consultabile ed accessibile.

Iniziamo da qui, da un nuovo sito che piano piano acquisterà tutte le
funzionalità di cui abbiamo bisogno e che ospiterà un nuovo progetto che
affiancherà il podcast: una **Newsletter settimanale** che useremo come canale
principale per condivdere i nostri contenuti e le nostre riflessioni in maniera
regolare e direttamente dalla tua casella di posta.

Una scelta questa per concentrarci sempre di più su contenuti di valore e anche
per dare la possibilità a chi vuole vivere una vera esperienza di [Minimalismo
Digitale]() l’opportunità di staccarsi dai social, continuandosi a nutrire con i
nostri contenuti.

Beh... direi che è tutto --- aspettando che parta la newsletter --- ci vediamo
ogni lunedì con un nuovo *episodio* del podcast.

Aspettatevi tante novità nei prossimi giorni 🙌

A presto!

</article>



<script>

// TODO ----
// 1. pass markdown template for email
// 2. form status update (via alpine) + form reset

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
