---
layout: default
tag: github-pages
permalink: /tag/github-pages/
---
<h1>Articles by tag: {{ page.tag }}</h1>
<div>
{% if site.tags[page.tag] %}
{% for post in site.tags[page.tag] %}
<a href="{{ post.url }}/">{{ post.title }}</a>
{% endfor %}
{% else %}
<p>There are no posts for this tag.</p>
{% endif %}
</div>

{% for data_tag in site.tags %}
{{ data_tag }}
{% endfor %}
