import Document, { Html, Head, Main, NextScript } from 'next/document';
import { loadPage } from '../lib/pages';

// Writes content/<slug>.html back out as the page: its own <html> attributes,
// <head> and <body>, byte for byte. The pages ship without Next's runtime
// (unstable_runtimeJS: false in pages/[slug].jsx), so nothing hydrates over the
// markup and the site's own scripts (GSAP, the pricing unlock) own the DOM.
export default class SiteDocument extends Document {
  render() {
    const slug = this.props.__NEXT_DATA__?.props?.pageProps?.slug;
    if (!slug) {
      // Next's own pages (404 / _error) have no content file
      return (
        <Html lang="en">
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
    const { htmlProps, headHtml, bodyProps, bodyHtml } = loadPage(slug);
    return (
      <html {...htmlProps}>
        <head dangerouslySetInnerHTML={{ __html: headHtml }} />
        <body {...bodyProps} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </html>
    );
  }
}
