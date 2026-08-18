import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Is Matchids free to use?",
    a: "Matchids offers a growing library of free books alongside premium books that require a one-time purchase.",
  },
  {
    q: "How does the Give Back program work?",
    a: "A portion of what Matchids earns supports children in orphanages who need it most, through donations and future campaigns.",
  },
  {
    q: "What payment methods are supported?",
    a: "Matchids is built to support debit and credit cards through a payment processor, plus CeloHT for CELO and USDm payments on the Celo blockchain — each becomes available as it's connected and verified.",
  },
  {
    q: "Is Matchids safe for children?",
    a: "Child safety is a core priority. See our Child Safety page for details on how content is reviewed and how families stay in control.",
  },
];

export default function FaqPage() {
  return (
    <Section eyebrow="Support" title="Frequently asked questions">
      <div className="max-w-2xl divide-y divide-black/5 rounded-2xl border border-black/5 bg-white shadow-sm">
        {faqs.map((item) => (
          <details key={item.q} className="group p-5">
            <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-ink/60">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
