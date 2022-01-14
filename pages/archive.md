---
title: archivio
---

# Archivio

## Pagine
{% for page in collections.page %}

- [{{page.data.title}}]({{page.url}})

{% endfor %}

## Articoli

{% for page in collections.post %}

- [{{page.data.title}}]({{page.url}})

{% endfor %}

## Newsletter

{% for page in collections.newsletter %}

- [{{page.data.title}}]({{page.url}})

{% endfor %}
