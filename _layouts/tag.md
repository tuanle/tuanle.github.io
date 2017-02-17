<h1>Articles by tag: {{ page.tag }}</h1>
<ul>
{% for post in site.posts %}
<a href="{{ post.url }}">
{% if post.tags contains page.tag %}
<li>
<h3>
<a href="{{ post.url }}">
{{ post.title }}
<small>{{ post.date | date_to_string }}</small>
</a>
</h3>
</li>
{% endif %}
{% endfor %}
</ul>
