---
title: todo
tags: page
permalink: "/todo/"
layout: page
---

## ==priority== 

###### PRE-LAUNCHING
- ~~landing page~~
   <!-- 
    - ~~color scheme~~
    - ~~hero message~~
    - ~~logo~~
    - ~~header with logo~~
    - ~~footer~~
    - ~~master text~~
    --->

- ==email registration==
    - ~~email verification~~
        - ~~create double opt-in link~~
        - ~~verify email (netlify function)~~
        - ~~create email template (where do you store it? written in md?)~~
        - try callback with netlify function
        - email should be unique (what to do?)
        - MV postmark api token to netlify ENV
    - update on-page message with alpine ("ti abbiamo mandato una email...)
    - update confirmation page message (something is off with the template)
    - ( script to check how many emails are not verified )

- force dark theme
- ~~redirect from 5p2p.it --> beta.5p2p.it~~
- update old stuff
    - change youtube promo video
    - change last post on blog (match new site master text)

###### (for launching)
- ==Newsletter build==
- ~~base.njk layout use block to add navigation~~
---
###### 2nd stage (migration)
- navigation menu
    - [hamburger](https://github.com/jonsuh/hamburgers)
- add old blog posts
- redirects
- youtube videos
- podcast episodes

###### 3rd stage (cleanup + optimization)
- css, js minification
- automatic image optimization
- lazy loading images
- code cleanup

###### 4th stage (new functionalites)
- search (preview)
- seo optimization
- contact form

---

## ==newsletter==
- ~~form build~~
- ~~netlify functions~~
- ~~faunadb integration~~
- ~~double opt-in confirmation link~~
- send emails through postmark
    - [postmark manual](https://postmarkapp.com/manual)
- check open rate (purge list) through fauna and postmark
- send emails from the command line
- send emails via netlify functions
- set on a global file general variables like fauna domain (e.g. db.fauna.com)

## content
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

## members integrations
- stripe connect (subscriptions)
- stripe connect (one time)
- paypal donations
- stripe customer portal

## optimization
- css minify & compression
- js minify & compression
- html minify

## seo
- [Automatic excerpt](https://www.11ty.dev/docs/data-frontmatter-customize/)
- tags
- metadata
- have a look at <https://iamjoona.com/blog/seo-tags-in-eleventy/>

## image
- automatic optimization & resizing

#### Notes
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

#### Fonts
 - [Notulen serif display](https://fontsfree.net/notulen-serif-display-extbd-font-download.html)
- [Atkinson Hyperlegible](https://github.com/googlefonts/atkinson-hyperlegible)

