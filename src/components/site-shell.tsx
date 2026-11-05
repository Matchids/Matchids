"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { OFFICIAL_CONTACT_EMAIL } from "@/lib/contact/constants";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/learning", label: "Learning" },
  { href: "/activities", label: "Activities" },
  { href: "/kids-art", label: "Kids Art" },
  { href: "/give-back", label: "Give Back" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const moreNavigation = [
  { href: "/parents", label: "For Parents" },
  { href: "/schools", label: "For Schools" },
  { href: "/creators", label: "For Creators" },
  { href: "/help", label: "Help" },
  { href: "/trust", label: "Trust & Safety" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-link" href="/" aria-label="Matchids home">
          <Image className="brand-logo" src="/logo/matchids-logo.png" alt="Matchids" width={1254} height={1254} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <details className="desktop-more">
            <summary>More</summary>
            <div>
              {moreNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            </div>
          </details>
        </nav>

        <div className="account-links">
          <Link className="sign-in-link" href="/account/sign-in">
            Sign in
          </Link>
          <Link className="button button-small button-ink" href="/account/sign-up">
            Create account
          </Link>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          {moreNavigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/account/sign-in" onClick={() => setMenuOpen(false)}>
            Sign in
          </Link>
          <Link href="/account/sign-up" onClick={() => setMenuOpen(false)}>
            Create account
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="brand-link footer-logo-link" href="/" aria-label="Matchids home">
            <Image className="brand-logo" src="/logo/matchids-logo.png" alt="Matchids" width={1254} height={1254} />
          </Link>
          <p>Stories, creativity, and care for children and families.</p>
        </div>
        <div className="footer-links">
          <Link href="/books">Books</Link>
          <Link href="/learning">Learning</Link>
          <Link href="/activities">Activities</Link>
          <Link href="/parents">For Parents</Link>
          <Link href="/schools">For Schools</Link>
          <Link href="/creators">For Creators</Link>
          <Link href="/kids-art">Kids Art</Link>
          <Link href="/give-back">Give Back</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <a href={`mailto:${OFFICIAL_CONTACT_EMAIL}`}>Email: {OFFICIAL_CONTACT_EMAIL}</a>
          <Link href="/child-safety">Child safety</Link>
          <Link href="/community-guidelines">Community guidelines</Link>
          <Link href="/trust">Trust & Safety</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/help">Help</Link>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Matchids</p>
      </div>
    </footer>
  );
}