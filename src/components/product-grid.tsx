"use client";

import { useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog";

const CART_KEY = "matchids-cart-v1";

export function ProductGrid({ products }: { products: CatalogProduct[] }) {
  const [message, setMessage] = useState("");

  function addToCart(productId: string) {
    try {
      const current: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
      const cart = Array.isArray(current) ? current as { id?: unknown; quantity?: unknown }[] : [];
      const existing = cart.find((item) => item.id === productId);
      const next = existing
        ? cart.map((item) => item.id === productId
            ? { id: productId, quantity: Math.min(Number(item.quantity) + 1 || 1, 20) }
            : item)
        : [...cart, { id: productId, quantity: 1 }];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("matchids-cart-changed"));
      setMessage("Added to your cart.");
    } catch {
      setMessage("Your browser could not save the cart. Please check storage settings.");
    }
  }

  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.imageUrl} alt={product.title} loading="lazy" />
            ) : <div className="art-image-empty">Product image not supplied</div>}
            <h2><Link href={`/shop/${product.id}`}>{product.title}</Link></h2>
            <p>{product.description}</p>
            <p className="product-price">{(product.priceCents / 100).toLocaleString(undefined, { style: "currency", currency: product.currency })}</p>
            <button className="button button-ink add-to-cart" type="button" onClick={() => addToCart(product.id)}>
              Add to cart
            </button>
          </article>
        ))}
      </div>
      <p className="cart-feedback" aria-live="polite">{message}</p>
      <p className="availability-note">Checkout remains unavailable until a real payment provider and server-side verification are connected.</p>
    </>
  );
}