import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/home/Section";

export const metadata: Metadata = {
  title: "Give Back",
  description: "Matchids' Give Back program supports children in orphanages who need it most.",
};

export default function GiveBackPage() {
  return (
    <>
      <Section
        eyebrow="Give Back"
        title="Reading that reaches further"
        description="Give Back is one of the most important parts of Matchids. A portion of what the platform earns is directed toward supporting children in orphanages who need it most."
      >
        <Link
          href="/donations"
          className="inline-block rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral-dark"
        >
          Make a donation
        </Link>
      </Section>

      <Section
        className="bg-white"
        eyebrow="Where things stand today"
        title="Built openly, one verified step at a time"
        description={undefined}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-cream p-5">
            <p className="font-display text-lg font-bold text-ink">Donation campaigns</p>
            <p className="mt-2 text-sm text-ink/60">
              No active campaign yet. Campaigns will appear here once published, each
              tied to a real goal.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-cream p-5">
            <p className="font-display text-lg font-bold text-ink">Verified organizations</p>
            <p className="mt-2 text-sm text-ink/60">
              We haven&apos;t named a partner organization yet. Any partner listed here in
              the future will be one Matchids has actually verified.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-cream p-5">
            <p className="font-display text-lg font-bold text-ink">Impact reports</p>
            <p className="mt-2 text-sm text-ink/60">
              Reports will be published from real donation and campaign data —
              never estimated or written in advance.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
