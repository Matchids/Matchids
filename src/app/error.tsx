"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-wrap content-page" role="alert">
      <p className="eyebrow">Something went wrong</p>
      <h1>We could not load this page.</h1>
      <p className="content-lead">Please try again. No private error details are shown here.</p>
      <button className="button button-ink" type="button" onClick={reset}>Try again</button>
    </section>
  );
}