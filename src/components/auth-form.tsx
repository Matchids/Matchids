"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/api/auth/${mode === "sign-in" ? "sign-in" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error ?? "We could not complete that request.");
        setPending(false);
        return;
      }

      const requestedPath = new URLSearchParams(window.location.search).get("next");
      const safePath = requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
        ? requestedPath
        : "/account";
      window.location.assign(safePath);
    } catch {
      setError("The service could not be reached. Please try again later.");
      setPending(false);
    }
  }

  const isSignUp = mode === "sign-up";
  return (
    <form className="auth-form" onSubmit={submit}>
      {isSignUp && (
        <label>
          <span>Your name</span>
          <input name="displayName" autoComplete="name" maxLength={80} required />
        </label>
      )}
      <label>
        <span>Email address</span>
        <input name="email" type="email" autoComplete="email" maxLength={254} required />
      </label>
      <label>
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          minLength={12}
          maxLength={72}
          required
        />
        {isSignUp && <small>Use 12 to 72 characters. Passwords are securely hashed.</small>}
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-ink auth-submit" type="submit" disabled={pending}>
        {pending ? "Please wait…" : isSignUp ? "Create parent account" : "Sign in"}
      </button>
      <p className="auth-switch">
        {isSignUp ? "Already have an account? " : "New to Matchids? "}
        <Link href={isSignUp ? "/account/sign-in" : "/account/sign-up"}>
          {isSignUp ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}