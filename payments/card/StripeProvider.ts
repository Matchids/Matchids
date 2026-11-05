import type { PaymentIntentRequest, PaymentIntentResult, PaymentProvider, PaymentVerificationOutcome } from "../types";

export class StripeProvider implements PaymentProvider {
  readonly id = "stripe" as const;

  isConfigured() {
    return false;
  }

  async createIntent(_request: PaymentIntentRequest): Promise<PaymentIntentResult> {
    throw new Error("Card payments are unavailable until a real processor intent and verification flow are implemented.");
  }

  async verifyTransaction(_providerReference: string): Promise<PaymentVerificationOutcome> {
    return { verified: false, reason: "Card payment verification is not implemented." };
  }
}