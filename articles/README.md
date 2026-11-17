# Articles

The Articles section of pkumarpmleader.com: Prashant's LinkedIn articles,
republished here as regular pages of the site.

- `index.html` lists the articles, newest first.
- One page per article, named after its slug.
- `articles.css` holds only what this section adds. The tokens, base type and
  footer come from `/styles.css`, so the section inherits the home page's
  palette and typography.
- `articles.json` is the metadata for the same five pieces, kept for a future
  rebuild or CMS import. It is not read at runtime.

Each page carries its own canonical URL here, with a note at the foot linking
to where the piece first appeared on LinkedIn. To add an article, write the
page, add its entry to `articles.json` and `/sitemap.xml`, and link it from
`index.html`.
