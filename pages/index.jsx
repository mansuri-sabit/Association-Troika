// The home page: content/index.html, written out by _document.jsx.
export const config = { unstable_runtimeJS: false };

export function getStaticProps() {
  return { props: { slug: 'index' } };
}

export default function Home() {
  return null;
}
