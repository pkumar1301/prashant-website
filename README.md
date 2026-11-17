# prashant-website

Personal site of Prashant Kumar, served at https://www.pkumarpmleader.com (the bare
domain pkumarpmleader.com redirects to www). It is also where his NFC business card
points, so the URL must not change.

Plain static files, no framework and no build: `index.html`, `styles.css`,
`main.js` and the images under `assets/`.

## Run it locally

```sh
python3 -m http.server 4173
# open http://localhost:4173
```

## Change content

- Text lives in `index.html`. Every figure and role on the page comes from his
  LinkedIn profile (export of September 2026); keep new claims to what he has
  published or approved.
- Talks, press and writing is the `<ul class="rail">` list in `index.html`,
  newest first. A new item needs a 960x540 or 960x720 `.webp` in `assets/` and a
  link that has been checked to load.
- Contact details for "Save contact" live in `scripts/build-vcard.mjs`. After
  editing them, run `node scripts/build-vcard.mjs` and commit the new
  `prashant-kumar.vcf`. The phone number is left out on purpose until he
  approves publishing it.

## Hosting (AWS Amplify)

- Amplify app connected to this repo, branch `main`. `amplify.yml` copies the
  site into `public/` and publishes it; `customHttp.yml` sets security headers
  and serves the `.vcf` as `text/vcard`.
- Custom domain `pkumarpmleader.com` with the `www` subdomain (Amplify Console,
  Hosting, Custom domains). The bare domain redirects to `www` with a 301 set in
  Spaceship, where both domains are registered.
- `pkumarpmlead.com` was the first domain bought by mistake. It is not attached
  to Amplify: a 301 URL redirect in Spaceship sends it, with or without `www`,
  to `https://www.pkumarpmleader.com/`.
- Rewrite for unknown paths: `/<*>` to `/404.html` with status 404.

## Photo credits

The panel photo in Talks, press and writing is from EL ESPAÑOL's VI Observatorio
5G (Madrid, July 2025).
