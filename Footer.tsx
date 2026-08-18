import Link from "next/link";

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/books/free", label: "Free books" },
      { href: "/books/premium", label: "Premium books" },
      { href: "/kids-art", label: "Kids Art" },
    ],
  },
  {
    heading: "Give Back",
    links: [
      { href: "/give-back", label: "Our mission" },
      { href: "/donations", label: "Donate" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Matchids" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/child-safety", label: "Child Safety" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="matchids-wave-divider mb-10 w-24" aria-hidden="true" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-lg font-bold text-ink">Matchids</p>
            <p className="mt-2 text-sm text-ink/60">
              A digital world where children learn, imagine, create and give.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-ink">{col.heading}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink/60 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-ink/40">
          © {new Date().getFullYear()} Matchids. Founded by Suzie Matchilda George.
        </p>
      </div>
    </footer>
  );
}
