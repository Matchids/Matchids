import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Payment options" };

export default function PaymentPage() {
  return (
    <Section
      eyebrow="Payments"
      title="How you can pay"
      description="Matchids is built on a provider-agnostic payment layer, so new methods can be added without changing how checkout works for families."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="font-display text-lg font-bold text-ink">Debit & credit cards</p>
          <p className="mt-2 text-sm text-ink/60">
            Card payments run through a payment processor. Exact card networks
            supported depend on the processor connected.
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="font-display text-lg font-bold text-ink">CeloHT (CELO & USDm)</p>
          <p className="mt-2 text-sm text-ink/60">
            CeloHT is a dapp for sending and receiving CELO and USDm on the
            Celo blockchain. It becomes available at checkout once the
            integration is connected and verified.
          </p>
        </div>
      </div>
    </Section>
  );
}
