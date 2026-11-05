import type { Metadata } from "next";
import { getContactRecipient } from "@/lib/contact/config";

export const metadata: Metadata = { title: "Frequently Asked Questions", alternates: { canonical: "/faq" } };

const questions = [
  ["Can I read books on Matchids now?", "The current catalog contains local-development sample entries only unless a published database catalog is configured. Reading files are not included yet."],
  ["Can I buy a book or product?", "No. Card and CeloHT payments are not operational, and checkout does not create orders or take payment."],
  ["Can I donate online?", "Online donations are not being accepted until a real payment provider and server-side verification flow are operational."],
  ["Who can create an account?", "The current signup flow is for parents and guardians. It does not create child accounts or public child profiles."],
];

export default function FaqPage() {
  const contactEmail = getContactRecipient();

  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Support</p>
      <h1>Frequently asked questions</h1>
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <p className="contact-note">
        Need help? <a href={`mailto:${contactEmail}`}>Contact Matchids at {contactEmail}</a>.
      </p>
    </section>
  );
}