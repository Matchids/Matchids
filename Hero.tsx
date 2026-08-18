import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-violet shadow-sm">
            Learn · Imagine · Create · Give
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl">
            A digital world where children learn, imagine, create and give.
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink/70">
            Matchids brings together storybooks, creative activities and a
            Give Back program — built for children, trusted by parents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/books/free"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-ink/90"
            >
              Start reading for free
            </Link>
            <Link
              href="/give-back"
              className="rounded-full border-2 border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/20"
            >
              See Give Back
            </Link>
          </div>
        </div>

        <div className="relative" aria-hidden="true">
          <div className="rounded-blob bg-gradient-to-br from-coral via-gold to-teal p-1 shadow-xl">
            <div className="rounded-[calc(2rem-4px)] bg-white p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-cream p-4">
                  <p className="font-display text-2xl">📚</p>
                  <p className="mt-2 text-sm font-semibold text-ink">Free & premium books</p>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <p className="font-display text-2xl">🎨</p>
                  <p className="mt-2 text-sm font-semibold text-ink">Kids Art activities</p>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <p className="font-display text-2xl">💛</p>
                  <p className="mt-2 text-sm font-semibold text-ink">Give Back program</p>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <p className="font-display text-2xl">🌍</p>
                  <p className="mt-2 text-sm font-semibold text-ink">Built for families everywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
