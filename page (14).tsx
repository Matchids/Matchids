"use client";

import { useState } from "react";
import { Section } from "@/components/home/Section";

const presetAmounts = [500, 1000, 2500, 5000]; // cents

export default function DonationsPage() {
  const [amountCents, setAmountCents] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [method, setMethod] = useState<"card" | "celoht">("card");
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? Math.round(parseFloat(customAmount) * 100) : amountCents;

    await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountCents: finalAmount, currency: "USD" }),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section eyebrow="Give Back" title="Thank you">
        <p className="max-w-md text-ink/70">
          Your donation has been recorded and is pending payment confirmation.
          You&apos;ll receive a confirmation once it&apos;s verified.
        </p>
      </Section>
    );
  }

  return (
    <Section eyebrow="Give Back" title="Make a donation" description="Every contribution supports Matchids' Give Back program.">
      <form onSubmit={handleDonate} className="max-w-md rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Choose an amount</legend>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setAmountCents(amount);
                  setCustomAmount("");
                }}
                className={`rounded-xl border-2 px-2 py-2 text-sm font-semibold transition ${
                  amountCents === amount && !customAmount
                    ? "border-coral bg-coral/10 text-coral-dark"
                    : "border-black/10 text-ink/70 hover:border-black/20"
                }`}
              >
                ${(amount / 100).toFixed(0)}
              </button>
            ))}
          </div>
          <label htmlFor="custom-amount" className="mt-3 block text-sm text-ink/60">
            Or enter a custom amount (USD)
          </label>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="0.01"
            inputMode="decimal"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="0.00"
            className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus-visible:outline-none"
          />
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">Payment method</legend>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-3 rounded-xl border border-black/10 px-3 py-3 text-sm">
              <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} />
              Debit or credit card
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-black/10 px-3 py-3 text-sm text-ink/50">
              <input
                type="radio"
                name="method"
                checked={method === "celoht"}
                onChange={() => setMethod("celoht")}
              />
              CeloHT — pay with CELO or USDm (coming soon)
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-coral py-3 text-sm font-semibold text-white transition hover:bg-coral-dark"
        >
          Donate
        </button>
        <p className="mt-3 text-xs text-ink/40">
          Payment is confirmed server-side before your donation is marked complete.
        </p>
      </form>
    </Section>
  );
}
