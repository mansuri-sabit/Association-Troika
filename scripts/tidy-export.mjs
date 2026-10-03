// _document.jsx writes content/<slug>.html out whole and never renders <Main />,
// so Next has nowhere to put its app container and appends it after </html>:
//
//     </body></html><div id="__next"></div>undefined
//
// Browsers render that trailing text, which is the stray "undefined" at the
// foot of the page. Nothing after </html> is ever wanted here, so it goes.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const END = '</html>';

const files = (await readdir(DIST, { recursive: true })).filter((f) => f.endsWith('.html'));

let cleaned = 0;
for (const rel of files) {
  const path = join(DIST, rel);
  const html = await readFile(path, 'utf8');
  const cut = html.lastIndexOf(END);
  if (cut === -1) continue;
  const trimmed = html.slice(0, cut + END.length);
  if (trimmed.length === html.length) continue;
  await writeFile(path, trimmed, 'utf8');
  cleaned++;
}

console.log(`tidy-export: trimmed trailing markup from ${cleaned} of ${files.length} pages`);
