import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAvailableProducts } from "@/lib/catalog";

interface ProductPageProps { params: { id: string } }

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = (await getAvailableProducts()).find((item) => item.id === params.id);
    return {
      title: product?.title ?? "Product not found",
      description: product?.description,
      alternates: { canonical: `/shop/${params.id}` },
    };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = (await getAvailableProducts()).find((item) => item.id === params.id);
  if (!product) notFound();

  return (
    <section className="page-wrap detail-page">
      <Link className="back-link" href="/shop">← Shop</Link>
      <div className="book-detail">
        <div className="detail-cover">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.title} />
          ) : <span>Product image not supplied</span>}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Matchids Shop</p>
          <h1>{product.title}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="product-price">{(product.priceCents / 100).toLocaleString(undefined, { style: "currency", currency: product.currency })}</p>
          <p className="availability-note">This item is published and in stock. Checkout is not available until a payment provider is configured and verified.</p>
        </div>
      </div>
    </section>
  );
}