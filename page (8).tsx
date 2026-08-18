import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <Section eyebrow="Account" title="Sign in to Matchids">
      <form className="max-w-sm space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">Email</label>
          <input id="email" type="email" required className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-ink">Password</label>
          <input id="password" type="password" required className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-cream hover:bg-ink/90">
          Sign in
        </button>
        <p className="text-center text-xs text-ink/50">
          New to Matchids? <a href="#" className="font-semibold text-violet">Create an account</a>
        </p>
      </form>
    </Section>
  );
}
