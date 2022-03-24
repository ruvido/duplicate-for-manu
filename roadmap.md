---
title: ROADMAP
tags: page
permalink: "/roadmap/"
layout: page
---


## OFFICIAL launch


#### ==**workflow**==
- ✅ write a post (set publishing date)
- ✅ push md post to repo -> generate json for post
- ✅ scheduled netlify function for site rebuilds (no future posts)
- ✅scheduled netlify function to send newsletters
    - ~~reset email flag isSent to *false*~~
    - ~~send batch emails untill all recipients (via scheduled functions)~~
        - fetch email addresses in batches (e.g. 1-500, 501-1000 etc.)
    - ~~send via postmark template~~
    - flag email once sent -> *isSent = true*

---

- ~~progressive LAUNCH~~
    - ~~first email as a test message~~
    - ~~ ... then start deliver~~
- newsletter-reset-isSent.js (**schedule** this)
- add txt email 

#### invite people
- invite people from other lists to subscribe:
    - ~~podcast (dillo negli episodi)~~
    - ~~telegram~~
    - donorbox
    - mailchimp
    - instagram (naturalmente)

#### other
- Add "Offri un caffè" (donorbox)
- Add ORA et LABORA logo + description + registration

#### MIGRATION (2nd stage)
- navigation menu
    - [hamburger](https://github.com/jonsuh/hamburgers)
- update footer
- add old blog posts
    - take care of *redirects*
- add youtube videos
- add podcast episodes

#### OPTIMIZATION (3rd stage)
- clean-up mailing list (delete blocked/unverified addresses)
- make a weekly dump of the fauna database -> netlify function + github
- emoticon stopped working
- migrate to ==supabase==
- css, js minification [parcel?](https://en.parceljs.org/)
- optimize logo size
- optimize image & font size for desktop
- automatic image optimization
- lazy loading images
- code cleanup
- cleanup layouts
- cleanup includes (and organize in folders)
- cleanup json.njk in includes (only used to send registration emails)
- script to check how many emails are not verified
- change youtube promo video
- have different branches for development and stable
- favicon

#### NEW FUNCTIONALITIES (4th stage)
- search (preview)
- seo optimization
- contact form
- verify email address without explicit opt-in but -- intead -- check if the welcome email is read (very cool (y))
- make a first draft of the headless CMS (auth)

#### SUBSCRIPTIONS (5th stage)
- replace donorbox with stripe subscriptions

---

## NOTES

####  ==newsletter==
- send emails through postmark
    - [postmark manual](https://postmarkapp.com/manual)
    - learn to use ==templates==
    - send through newsletter-channel
    - how to send in batch?
- purge fauna list using postamrk data (purge list)
- scheduled send (for newsletters)

#### content
- ~~new.css~~
- ~~add version in link css~~
- ~~first letter (BIG)~~
- ~~first paragraph~~
- ~~article and blog collections~~
- side navbar
    - ~~sidebar script~~
    - sidebar styling
    - sidebar in Alpine.js
    - [Animated hamburger icon](https://github.com/Typogram/Anicons)
    - re-write sidebar script in Alpine
- carousel members feedback (store comments to fauna)
- Scrivici form
- Serif font: try [Merriweather](https://docs.xz.style/fonts/fonts/merriweather) 
- Headles cms --> ghost integration

#### members integrations
- stripe connect (subscriptions)
- stripe connect (one time)
- paypal donations
- stripe customer portal

#### optimization
- css minify & compression
- js minify & compression
- html minify

#### seo
- [Automatic excerpt](https://www.11ty.dev/docs/data-frontmatter-customize/)
- tags
- metadata
- have a look at <https://iamjoona.com/blog/seo-tags-in-eleventy/>

#### image
- automatic optimization & resizing



<!---

## Important DATES

- 12 Feb 2021 -- 1st podcast episode
- ==7 Feb 2022== -- si potrebbe fare un episodio del podcast
    per celebrare un anno di episodi e lanciare il nuovo sito

## BETA launch

- ~~==email registration==~~
    - ~~email verification~~
    - ~~update confirmation EMAIL text template~~

- ~~redirect from 5p2p.it -> beta.5p2p.it~~
- ~~link to 5p2p.it ARCHIVE~~
- ~~force dark theme~~
- ~~redirect 5p2p.it -> beta.5p2p.it~~
- ~~update fauna records (newsletter: true)~~
- ~~make it public in this date (js function on landin page)~~
- ~~make a test in the wild (ask ale)~~

-->



## RESOURCES

- [Introduction to 11ty -- Smashing Magazine](https://www.smashingmagazine.com/2021/03/eleventy-static-site-generator/?utm_source=pocket_mylist)
- [11ty + Tailwind + Alpine -- basic starter](https://css-tricks.com/eleventy-starter-with-tailwind-css-alpine-js/)
- [Manage Subscriptions and Protect Content With Stripe](https://www.netlify.com/blog/2020/07/13/manage-subscriptions-and-protect-content-with-stripe/?utm_source=pocket_mylist)
- [Learn how to accept money on jamstack](https://www.netlify.com/blog/2020/04/13/learn-how-to-accept-money-on-jamstack-sites-in-38-minutes/)
- [Stripe subscription gist](https://github.com/stripe-samples/checkout-single-subscription/blob/939a106922f53a0bcd6918acd7de85d0a70935e9/server/node/server.js)
- html5 semantics 
    - <https://developer.mozilla.org/en-US/docs/Glossary/Semantics> 
    - <https://developer.mozilla.org/en-US/docs/Web/HTML/Element>
- [Markdonw-it plugins](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
- [Userbase & Stripe for authentication](https://userbase.com/docs/sdk/purchase-subscription/)
- [Passwordless login with Fauna](https://dev.to/gzuidhof/implementing-serverless-passwordless-login-with-faunadb-l30)
- [Stripe customer portal](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal)
- [Alpine Handbook Examples ⭐](https://alpinejshandbook.com/examples/?path=/story/chapter-1-1-x-data-x-text--hello-world)
- [Color picker palette](https://coolors.co/1d2738)
- [Mozilla Guide to Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [css inlining](https://kittygiraudel.com/2020/12/03/inlining-scripts-and-styles-in-11ty/)
- [email css inlining 11ty](https://github.com/5t3ph/11ty-email-generator)
- [build counter with fauna](https://davidparks.dev/blog/building-a-like-counter-with-faunadb-and-nuxt/#writing-our-functions)
- [Plain text emails](https://www.litmus.com/blog/best-practices-for-plain-text-emails-a-look-at-why-theyre-important/)
- [Alpinejs form submission](https://dberri.com/lets-build-an-ajax-form-with-alpine-js/)
- ==[Supabase Authentication + Stripe billing](https://www.sandromaglione.com/supabase-auth-create-stripe-customer-subscription-supabase-stripe-billing-part-1/)==
- [11ty future dates and drafts](https://jkc.codes/blog/creating-drafts-in-eleventy/)
- [netlify-plugin-ghost-markdown ](https://github.com/daviddarnes/netlify-plugin-ghost-markdown/blob/master/index.js)
- [Using Netlify Functions to Create Signing Tokens
](https://dev.to/mux/using-netlify-functions-to-create-signing-tokens-25i6)

#### Fonts
 - [Notulen serif display](https://fontsfree.net/notulen-serif-display-extbd-font-download.html)
- [Atkinson Hyperlegible](https://github.com/googlefonts/atkinson-hyperlegible)
- [Feather Icons](https://feathericons.com/)

### Fauna
- [Fauna FQL tutorial](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)

### Dashboard
- [Halfmoon](https://www.gethalfmoon.com/)
