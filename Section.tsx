import { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-4 py-14 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-violet">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold text-ink">{title}</h2>
          {description && <p className="mt-3 text-ink/70">{description}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
