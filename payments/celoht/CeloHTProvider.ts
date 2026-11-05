import type { PaymentIntentRequest, PaymentIntentResult, PaymentProvider, PaymentVerificationOutcome } from "../types";

export class CeloHTProvider implements PaymentProvider {
  readonly id = "celoht" as const;

  isConfigured() {
    return false;
  }

  async createIntent(_request: PaymentIntentRequest): Promise<PaymentIntentResult> {
    throw new Error("CeloHT is unavailable until its intent and transaction verification APIs are implemented.");
  }

  async verifyTransaction(_providerReference: string): Promise<PaymentVerificationOutcome> {
    return { verified: false, reason: "CeloHT server-side transaction verification is not implemented." };
  }
}