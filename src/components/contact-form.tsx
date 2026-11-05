"use client";

import { useState, type FormEvent } from "react";

type SubmissionState =
  | { kind: "idle" }
  | { kind: "success"; notificationSent: boolean }
  | { kind: "error"; message: string };

export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setBusy(true);
    setState({ kind: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json() as { notificationSent?: boolean; error?: string };

      if (!response.ok) {
        setState({ kind: "error", message: result.error ?? "We couldn't save your message. Please try again or email us directly." });
        return;
      }

      setState({ kind: "success", notificationSent: result.notificationSent === true });
      form.reset();
    } catch {
      setState({ kind: "error", message: "We couldn't reach the contact service. Please email us directly." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" maxLength={80} required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" maxLength={254} required />
      </label>
      <label>
        <span>Subject</span>
        <input name="subject" type="text" maxLength={120} required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={7} minLength={10} maxLength={5000} required />
      </label>
      <p className="contact-privacy">Please do not include passwords, payment details, or private information about a child.</p>
      {state.kind === "success" && (
        <p className="contact-success" role="status">
          {state.notificationSent
            ? "Your message was saved and an email notification was accepted by our mail provider. Thank you."
            : <>Your message was saved, but email notification is unavailable right now. For urgent matters, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</>}
        </p>
      )}
      {state.kind === "error" && <p className="form-error" role="alert">{state.message}</p>}
      <button className="button button-ink auth-submit" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Submit message"}
      </button>
    </form>
  );
}