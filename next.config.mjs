/** @type {import('next').NextConfig} */
export default {
  // cPanel serves files, it can't run a Node server: build plain HTML into dist/
  output: 'export',
  distDir: 'dist',
  // /contact -> dist/contact.html, which is the layout the root .htaccess
  // rewrites /contact/ to. Don't switch on trailingSlash without changing it.
  trailingSlash: false,
  images: { unoptimized: true },
  // a stray package-lock.json higher up (C:\Users\<you>) would otherwise be taken as the root
  outputFileTracingRoot: import.meta.dirname,
};
