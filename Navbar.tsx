"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/books", label: "Books" },
  { href: "/kids-art", label: "Kids Art" },
  { href: "/give-back", label: "Give Back" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-xl font-bold text-ink">
          Matchids
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-semibold text-ink/80 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/account"
            className="rounded-full px-4 py-2 text-sm font-semibold text-ink/80 hover:text-ink"
          >
            Sign in
          </Link>
          <Link
            href="/give-back"
            className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-dark"
          >
            Give Back
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-2xl">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-black/5 px-4 pb-4 md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            className="rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-black/5"
            onClick={() => setOpen(false)}
          >
            Sign in
          </Link>
        </nav>
      )}
    </header>
  );
}
