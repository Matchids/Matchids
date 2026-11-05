import { describe, it, expect } from "vitest";
import { CeloHTProvider } from "@/lib/payments/providers/CeloHTProvider";
import { StripeProvider } from "@/lib/payments/providers/StripeProvider";

describe("payment providers report configuration honestly", () => {
  it("CeloHTProvider is not configured without env vars", () => {
    delete process.env.CELOHT_API_BASE_URL;
    delete process.env.CELOHT_API_KEY;
    const provider = new CeloHTProvider();
    expect(provider.isConfigured()).toBe(false);
  });

  it("CeloHTProvider.createIntent rejects when not configured", async () => {
    delete process.env.CELOHT_API_BASE_URL;
    delete process.env.CELOHT_API_KEY;
    const provider = new CeloHTProvider();
    await expect(
      provider.createIntent({
        purpose: { kind: "donation", donationId: "d1" },
        amountCents: 1000,
        currency: "USD",
      })
    ).rejects.toThrow(/unavailable/i);
  });

  it("StripeProvider is not configured without a secret key", () => {
    delete process.env.STRIPE_SECRET_KEY;
    const provider = new StripeProvider();
    expect(provider.isConfigured()).toBe(false);
  });

  it("credentials alone do not enable an unimplemented payment provider", () => {
    process.env.STRIPE_SECRET_KEY = "configured-but-not-integrated";
    process.env.CELOHT_API_BASE_URL = "https://provider.example.invalid";
    process.env.CELOHT_API_KEY = "configured-but-not-integrated";

    expect(new StripeProvider().isConfigured()).toBe(false);
    expect(new CeloHTProvider().isConfigured()).toBe(false);

    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.CELOHT_API_BASE_URL;
    delete process.env.CELOHT_API_KEY;
  });
});
