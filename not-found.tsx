import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-5xl">🧭</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink/60">
        The page you're looking for doesn't exist, or may have moved.
      </p>
      <Link href="/" className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream hover:bg-ink/90">
        Back to home
      </Link>
    </section>
  );
}
