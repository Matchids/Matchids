import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getContactRecipient } from "@/lib/contact/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Matchids for help with books, learning, family accounts, and the platform.",
  alternates: { canonical: "/contact" },
  other: { "contact:email": "matchids911@gmail.com" },
};

export default function ContactPage() {
  const contactEmail = getContactRecipient();

  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Contact</p>
      <h1>Contact Matchids</h1>
      <p className="content-lead">Questions from parents, readers, schools, and creators are welcome. Please do not include sensitive information about a child.</p>
      <p className="contact-address">Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      <ContactForm contactEmail={contactEmail} />
    </section>
  );
}