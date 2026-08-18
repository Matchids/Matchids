"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { demoBooks } from "@/data/demo-books";

export default function CheckoutPage() {
  const params = useSearchParams();
  const bookId = params.get("book");
  const book = demoBooks.find((b) => b.id === bookId);
  const [method, setMethod] = useState<"card" | "celoht">("card");
  const [status, setStatus] = useState<"idle" | "processing" | "unavailable">("idle");

  const handlePay = async () => {
    setStatus("processing");
    if (method === "celoht") {
      const res = await fetch("/api/payments/celoht", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose: { kind: "book_purchase", orderId: "demo-order" },
          amountCents: book?.priceCents ?? 0,
          currency: "USD",
        }),
      });
      if (!res.ok) {
        setStatus("unavailable");
        return;
      }
    }
    // Card flow would redirect to the processor's hosted checkout / element here.
    setStatus("unavailable");
  };

  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-md rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-ink">Checkout</h1>

        {book ? (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-cream p-4 text-sm">
            <span className="font-semibold text-ink">{book.title}</span>
            <span className="text-ink/70">
              {(book.priceCents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" })}
            </span>
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink/60">No item selected.</p>
        )}

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">Payment method</legend>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-3 rounded-xl border border-black/10 px-3 py-3 text-sm">
              <input type="radio" checked={method === "card"} onChange={() => setMethod("card")} />
              Debit or credit card
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-black/10 px-3 py-3 text-sm">
              <input type="radio" checked={method === "celoht"} onChange={() => setMethod("celoht")} />
              CeloHT — CELO / USDm
            </label>
          </div>
        </fieldset>

        <button
          onClick={handlePay}
          disabled={!book || status === "processing"}
          className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-cream transition hover:bg-ink/90 disabled:opacity-50"
        >
          {status === "processing" ? "Processing…" : "Pay now"}
        </button>

        {status === "unavailable" && (
          <p className="mt-3 text-sm text-coral-dark">
            This payment method isn&apos;t connected yet in this environment. No
            charge was made — access is only granted once a real payment is
            verified on the backend.
          </p>
        )}
      </div>
    </section>
  );
}
