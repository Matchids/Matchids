import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { getAvailableProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Cart", robots: { index: false, follow: false } };

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const products = await getAvailableProducts();
  return (
    <section className="page-wrap catalog-page">
      <div className="section-heading">
        <p className="eyebrow">Your selection</p>
        <h1>Shopping cart</h1>
      </div>
      <CartView products={products} />
    </section>
  );
}