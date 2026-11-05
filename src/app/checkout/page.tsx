import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Checkout</p>
      <h1>Payment is not available yet.</h1>
      <p className="content-lead">Matchids has no operational card or CeloHT payment integration in this repository. No order has been submitted, and no payment can be made from this page.</p>
      <Link className="button button-outline" href="/cart">Return to your cart</Link>
    </section>
  );
}