"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { CatalogProduct } from "@/lib/catalog";

const CART_KEY = "matchids-cart-v1";
const CART_CHANGED = "matchids-cart-changed";
type CartLine = { id: string; quantity: number };

function subscribeToCart(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_CHANGED, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_CHANGED, callback);
  };
}

function getCartSnapshot() {
  return localStorage.getItem(CART_KEY);
}

function getServerCartSnapshot() {
  return null;
}

function parseCart(value: string | null): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item): CartLine[] => {
      if (!item || typeof item.id !== "string" || !Number.isInteger(item.quantity)) return [];
      return [{ id: item.id, quantity: Math.max(1, Math.min(item.quantity, 20)) }];
    });
  } catch {
    return [];
  }
}

export function CartView({ products }: { products: CatalogProduct[] }) {
  const cartValue = useSyncExternalStore(subscribeToCart, getCartSnapshot, getServerCartSnapshot);
  const cart = parseCart(cartValue);

  function remove(productId: string) {
    const next = cart.filter((line) => line.id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CART_CHANGED));
  }

  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.id);
    return product ? [{ ...line, product }] : [];
  });

  if (!lines.length) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Products you add from the shop will appear here. Items are not reserved until checkout is available.</p>
        <Link className="text-action" href="/shop">Browse the shop <span aria-hidden="true">→</span></Link>
      </div>
    );
  }

  return (
    <>
      <div className="cart-lines">
        {lines.map(({ id, quantity, product }) => (
          <article className="cart-line" key={id}>
            <div>
              <h2>{product.title}</h2>
              <p>{(product.priceCents / 100).toLocaleString(undefined, { style: "currency", currency: product.currency })} each · Quantity {quantity}</p>
            </div>
            <button className="remove-button" type="button" onClick={() => remove(id)} aria-label={`Remove ${product.title} from cart`}>
              Remove
            </button>
          </article>
        ))}
      </div>
      <div className="checkout-notice">
        <h2>Checkout is not available yet</h2>
        <p>No order has been created and no payment has been taken. Your cart stays in this browser.</p>
      </div>
    </>
  );
}