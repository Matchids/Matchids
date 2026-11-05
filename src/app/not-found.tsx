import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This page is not here.</h1>
      <p className="content-lead">The page may have moved, or the link may be incorrect.</p>
      <Link className="button button-ink" href="/">Return home</Link>
    </section>
  );
}