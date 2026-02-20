---
layout: default
title: Texo
---

{% capture readme %}
{% include_relative README.md %}
{% endcapture %}

{{ readme | markdownify }}
