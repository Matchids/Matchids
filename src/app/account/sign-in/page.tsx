import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default function SignInPage() {
  return (
    <section className="page-wrap auth-page">
      <p className="eyebrow">Welcome back</p>
      <h1>Sign in to Matchids</h1>
      <p className="auth-intro">Family accounts are managed by a parent or guardian.</p>
      <AuthForm mode="sign-in" />
    </section>
  );
}