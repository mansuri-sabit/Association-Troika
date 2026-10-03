import { listSlugs } from '../lib/pages';

// One route per file in content/. The markup itself is written by _document.jsx;
// this only tells Next which pages exist.
export const config = { unstable_runtimeJS: false };

export function getStaticPaths() {
  return {
    paths: listSlugs()
      .filter((slug) => slug !== 'index')
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

export default function Page() {
  return null;
}
