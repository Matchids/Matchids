import Link from "next/link";

export interface BookCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  ageRange: [number, number];
  accessType: "FREE" | "PREMIUM";
  priceCents?: number;
  currency?: string;
}

export function BookCard({
  id,
  title,
  description,
  author,
  ageRange,
  accessType,
  priceCents = 0,
  currency = "USD",
}: BookCardProps) {
  return (
    <Link
      href={`/books/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div
        className="flex h-40 items-center justify-center bg-gradient-to-br from-teal/20 via-gold/20 to-coral/20 text-4xl"
        aria-hidden="true"
      >
        📖
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              accessType === "FREE" ? "bg-teal/15 text-teal-dark" : "bg-gold/20 text-gold-dark"
            }`}
          >
            {accessType === "FREE" ? "Free" : "Premium"}
          </span>
          <span className="text-xs text-ink/50">
            Ages {ageRange[0]}–{ageRange[1]}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-ink group-hover:text-violet">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink/60">{description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="text-ink/50">by {author}</span>
          {accessType === "PREMIUM" && priceCents > 0 && (
            <span className="font-semibold text-ink">
              {(priceCents / 100).toLocaleString(undefined, {
                style: "currency",
                currency,
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
