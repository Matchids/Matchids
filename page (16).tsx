import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms of Service">
      <div className="prose max-w-2xl text-sm text-ink/70">
        <p>
          These terms govern use of Matchids' website and services, including
          free and premium book access, Kids Art activities, and the Give
          Back donation program.
        </p>
        <p className="mt-4">
          This page is a starting structure and will be reviewed by counsel
          before launch, including specific terms for payment (card and
          CeloHT) and refund handling.
        </p>
      </div>
    </Section>
  );
}
