import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Child Safety" };

export default function ChildSafetyPage() {
  return (
    <Section
      eyebrow="Trust & Safety"
      title="Child safety at Matchids"
      description="Every piece of content on Matchids — books and Kids Art alike — is reviewed for age-appropriateness before publication. Parental accounts control what child profiles can access and purchase."
    >
      <div className="max-w-2xl space-y-3 text-sm text-ink/70">
        <p>Parents and guardians can report any concerning content directly through the Contact page.</p>
        <p>Matchids does not use manipulative design patterns aimed at children, and does not run third-party advertising targeted at child accounts.</p>
      </div>
    </Section>
  );
}
