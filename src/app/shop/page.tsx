import type { Metadata } from "next";
import { getAvailableProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product-grid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore products from Matchids when they become available.",
  alternates: { canonical: "/shop" },
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getAvailableProducts();
  return (
    <section className="page-wrap catalog-page">
      <div className="section-heading">
        <p className="eyebrow">Matchids Shop</p>
        <h1>Thoughtful things, coming in time</h1>
        <p>Only products published in the Matchids catalog will appear here.</p>
      </div>
      {products.length ? (
        <ProductGrid products={products} />
      ) : (
        <div className="empty-state">
          <h2>No products are available</h2>
          <p>The shop has no published, in-stock products yet. No sample orders or products are shown.</p>
        </div>
      )}
    </section>
  );
}