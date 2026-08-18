import { Section } from "@/components/home/Section";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Get in touch" description="Have a question about Matchids, a book, or the Give Back program?">
      <form className="max-w-md space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">Name</label>
          <input id="name" name="name" type="text" required className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-ink">Message</label>
          <textarea id="message" name="message" rows={4} required className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-cream hover:bg-ink/90">
          Send message
        </button>
      </form>
    </Section>
  );
}
