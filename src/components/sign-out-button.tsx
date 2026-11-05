"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function signOut() {
    setError("");
    try {
      const response = await fetch("/api/auth/sign-out", { method: "POST" });
      if (!response.ok) throw new Error("Sign out failed.");
      router.replace("/");
    } catch {
      setError("Sign out could not be completed. Please try again.");
    }
  }

  return (
    <>
      <button className="button button-outline" type="button" onClick={signOut}>Sign out</button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </>
  );
}