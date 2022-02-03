---
title: ROADMAP
tags: page
permalink: "/roadmap/"
layout: page
---
## Important DATES

- 12 Feb 2021 -- 1st podcast episode
- ==possible dates==
    - 7 Feb 2022 -- si potrebbe fare un episodio del podcast
    per celebrare un anno di episodi e lanciare il nuovo sito
    - 14 Feb 2022

## BETA launch

- ==email registration==
    - ~~email verification~~
    - update confirmation EMAIL text template

- ~~redirect from 5p2p.it --> beta.5p2p.it~~
- ~~link to 5p2p.it ARCHIVE~~
- ~~force dark theme~~
- ~~redirect 5p2p.it --> beta.5p2p.it~~
- update fauna records (newsletter: true)
- make it public in this date (js function on landin page)
- make a test in the wiild (ask ale)

#### social
- say it in a podcast episode
- *make a video to launch the beta*

## OFFICIAL launch

- choose a LAUNCHING DATE!
    - check saints calendar
- 11ty do not publish future dates
- create json from fauna with post of today -> publish it
- ==Newsletter build==
    - build a publishing strategy
        - [Send via Curl](https://stackoverflow.com/questions/63754466/curl-sends-but-lambda-netlify-function-forbidden)
    - cron to build everyday
    - build a simple template
    - Scheduling:
        - [scheduling netlify functions](https://chan.dev/posts/schedule-netlify-builds-with-github-actions/)
        - [Scheduled Functions Launches in Beta](https://www.netlify.com/blog/quirrel-joins-netlify-and-scheduled-functions-launches-in-beta)
        - [Scheduled Functions Documentation](https://github.com/netlify/labs/blob/main/features/scheduled-functions/documentation/README.md)
        - [Functions trigger](https://docs.netlify.com/functions/trigger-on-events/)
- invite people from other lists to subscribe:
    - telegram
    - donorbox
    - mailchimp
    - instagram (naturalmente)
    - podcast (dillo negli episodi)
- Add "Offri un caffè" (donorbox)


#### MIGRATION (2nd stage)
- navigation menu
    - [hamburger](https://github.com/jonsuh/hamburgers)
- update footer
- add old blog posts
    - take care of *redirects*
- add youtube videos
- add podcast episodes

#### OPTIMIZATION (3rd stage)
- css, js minification [parcel?](https://en.parceljs.org/)
- optimize logo size
- optimize image & font size for desktop
- automatic image optimization
- lazy loading images
- code cleanup
- script to check how many emails are not verified
- change youtube promo video
- have different branches for development and stable
- favicon

#### NEW FUNCTIONALITIES (4th stage)
- search (preview)
- seo optimization
- contact form

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

#### Fonts
 - [Notulen serif display](https://fontsfree.net/notulen-serif-display-extbd-font-download.html)
- [Atkinson Hyperlegible](https://github.com/googlefonts/atkinson-hyperlegible)
- [Feather Icons](https://feathericons.com/)

### Fauna
- [Fauna FQL tutorial](https://fauna.com/blog/getting-started-with-fql-faunadbs-native-query-language-part-1)
