# Troika AI Partner Association Program (Next.js)

A one-page site for the **AI Partner Association Program** brochure, built with the same setup as `../troika-next`: Next.js exports a static folder (`dist/`) that is uploaded to cPanel as-is.

The page is a complete HTML file in `content/index.html`, written out unchanged by `pages/_document.jsx`, with none of Next's own JavaScript on the page.

## Commands

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # -> dist/
npm run preview   # serve dist/ at http://127.0.0.1:8001 (needs PHP on PATH)
```

## Where things live

| Path | What |
|---|---|
| `content/index.html` | The whole page. Edit copy here. Another `content/<slug>.html` becomes `/<slug>/`. |
| `public/` | Copied into `dist/` untouched: `.htaccess`, `robots.txt`, `sitemap.xml`, `assets/`, `_site/static/` (theme stylesheet and fonts). |
| `pages/`, `lib/`, `scripts/` | The same thin Next.js wrapper as `troika-next`. |

## Design

The page has its own design, separate from troikatech.in: cream paper background, deep ink and Troika violet with a marigold accent, Tropiline serif headlines with italic highlights, DM Sans body text. All CSS and JS are inline in `content/index.html`; there is no shared theme stylesheet or animation library. Only the Troika logos and favicons are shared with the main site.

## Images

Put pictures in `public/assets/images/association/` with the names below. Until a file is there, the page shows a labelled placeholder with the name and size it expects (see the README in that folder).

| File | Size | Where |
|---|---|---|
| `hero.webp` | 1200 × 1500 | Hero, arch frame |
| `program.webp` | 1600 × 1000 | About the Program |
| `troika.webp` | 1200 × 1500 | Who is Troika |
| `association.webp` | 1200 × 1440 | Benefits to the Association |
| `cta.webp` | 1920 × 1080 | Closing section background (darkened automatically) |
| `og-image.jpg` | 1200 × 630 | Link preview when the page is shared |

Header and footer links point at `https://troikatech.in/`. All calls to action open WhatsApp (+91 98674 33544).

## Before going live

- The page assumes it is served at `https://association.troikatech.in/` (canonical, Open Graph, `robots.txt`, `sitemap.xml`). Change those if the address differs.
- Upload the **contents** of `dist/` into the site's document root, including `.htaccess`.
