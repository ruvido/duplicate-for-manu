---
title: todo
---

## ==priority== 
###### (for launching)

- ==Newsletter build==
- ==import old content== 
    - blog posts
    - (podcast episodes)
    - (youtube videos)
- navigation menu

---
###### 2nd stage
- search (preview)

---

## newsletter
- form build ✅
- netlify functions ✅
- faunadb integration ✅
- send emails through postmark
    - [postmark manual](https://postmarkapp.com/manual)
- check open rate (purge list) through fauna and postmark
- send emails from the command line
- send emails via netlify functions

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
- Scrivici form
- Serif font: try [Merriweather](https://docs.xz.style/fonts/fonts/merriweather) 

## members integrations
- stripe connect (subscriptions)
- stripe connect (one time)
- paypal donations
- (stripe & paypal --> ghost integration)
- newsletter subscriptions (ghost subscription or just mailgun??)
- carousel members feedback

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
