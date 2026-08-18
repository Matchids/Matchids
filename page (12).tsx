import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <Section eyebrow="Legal" title="Privacy Policy">
      <div className="prose max-w-2xl text-sm text-ink/70">
        <p>
          Matchids collects only the information needed to provide the
          service: account details, purchase history, and donation records.
          Because Matchids serves children, we apply extra care to any data
          associated with a child profile, and parental accounts control what
          children can access.
        </p>
        <p className="mt-4">
          This page is a starting structure. The full policy will be reviewed
          by counsel before launch and updated with specific data retention,
          third-party processor, and regional compliance details (including
          COPPA and GDPR-K considerations) as those are finalized.
        </p>
      </div>
    </Section>
  );
}
