---
title: We're back! 💪
permalink: "/"
layout: base-noNavbar.njk
---
<article>

<h1>{{title}}</h1>

v {{version}}

***5PANI2PESCI*** ritorna! 

Arriva la **newsletter** ⭐ e tante altre cosette belle. 
Iscriviti e ti avviseremo appena siamo pronti!

***#daje!***

<div x-data="newsletterSubscription" >
<div x-show="isCompleted" class="success" x-html="finalMessage"x-cloak></div>
<div x-show="!isCompleted">
 <div style="display:flex; flex-direction: row">
  <input x-model="email" @keyup.enter="sendEmail" type="email" name="email" placeholder="la tua email" autocomplete="off" :disabled=isSubmitted />
  <button x-on:click="sendEmail" x-bind:disabled=isSubmitted>
   <span :class=loadingAnimation(isSubmitted) x-text=actionText(isSubmitted)></span></button>


 </div>
 </div>
 <small x-show="!isEmail" style="padding: 0 0.4rem" x-cloak>
 mmmmh... email non corretta, controlla
 </small>
</div>


<center>
<aside>
<small>
<a class="angle" href="https://5p2p.it/archivio">
Torna al vecchio Blog di 5pani2pesci</a></small>
</aside>
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
function newsletterSubscription (){
    return {
        email: '',
        isEmail: true,
        isSubmitted: false,
        isCompleted: false,
        finalMessage: '??',
        actionText(isLoading){
              return (isLoading ? '' : 'iscriviti');
        },
        loadingAnimation(isLoading){
              return (isLoading ? 'loading dots2' : '');
        },
        testEmail(em){
            var re = /^\S+@\S+\.\S+$/
            return re.test(em)
        },
        async sendEmail(){
            this.isEmail = await this.testEmail(this.email)
            if (this.isEmail) {
                this.isSubmitted = true
                const postResp = await fetch(
                        "/.netlify/functions/newsletter-subscription",
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: this.email
                            })
                        }
                )
                .then( resp => resp.json())

                this.isSubmitted = false
                this.isCompleted = true
                this.finalMessage = postResp.message
                console.log(postResp.message)
                console.log(postResp.data)
            }
            else {
                console.log ('ERR> not an email')
            }
        }

    }
}
</script>


