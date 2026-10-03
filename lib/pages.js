// Each page of the site is a complete HTML document in content/<slug>.html.
// Next.js only wraps them: _document.jsx writes the file's own <head> and <body>
// back out unchanged, so the built page is the same markup as the source file.

import fs from 'node:fs';
import path from 'node:path';

const CONTENT = path.join(process.cwd(), 'content');

/** URL slugs of every page, from the files in content/ ("index" is the home page). */
export function listSlugs() {
  return fs
    .readdirSync(CONTENT)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.slice(0, -5));
}

function attrsToProps(attrString) {
  const props = {};
  const re = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m;
  while ((m = re.exec(attrString))) {
    const name = m[1];
    const value = m[2] ?? m[3] ?? m[4] ?? '';
    if (name === 'class') props.className = value;
    else if (name === 'style') {
      props.style = Object.fromEntries(
        value
          .split(';')
          .map((d) => d.split(':').map((s) => s.trim()))
          .filter(([k, v]) => k && v)
          .map(([k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v])
      );
    } else props[name] = value;
  }
  return props;
}

/** Splits content/<slug>.html into the parts _document.jsx needs. */
export function loadPage(slug) {
  const html = fs.readFileSync(path.join(CONTENT, `${slug}.html`), 'utf8');
  const htmlTag = html.match(/<html\b([^>]*)>/i);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const body = html.match(/<body\b([^>]*)>([\s\S]*)<\/body>/i);
  if (!htmlTag || !head || !body) {
    throw new Error(`content/${slug}.html is not a complete <html><head>…</head><body>…</body> document`);
  }
  return {
    htmlProps: attrsToProps(htmlTag[1]),
    headHtml: head[1],
    bodyProps: attrsToProps(body[1]),
    bodyHtml: body[2],
  };
}
