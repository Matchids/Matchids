import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Create a parent account", robots: { index: false, follow: false } };

export default function SignUpPage() {
  return (
    <section className="page-wrap auth-page">
      <p className="eyebrow">Family account</p>
      <h1>Create a parent account</h1>
      <p className="auth-intro">This account is for a parent or guardian. Matchids does not create public child profiles.</p>
      <AuthForm mode="sign-up" />
    </section>
  );
}