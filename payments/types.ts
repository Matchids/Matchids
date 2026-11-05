export type PaymentPurpose =
  | { kind: "book_purchase"; orderId: string }
  | { kind: "donation"; donationId: string; campaignId?: string };

export type SupportedCurrency = "USD" | "EUR" | "CELO" | "USDM";

export interface PaymentIntentRequest {
  purpose: PaymentPurpose;
  amountCents: number;
  currency: SupportedCurrency;
  userId?: string;
}

export interface PaymentIntentResult {
  paymentId: string;
  clientPayload: unknown;
  provider: PaymentProviderId;
}

export type PaymentVerificationOutcome =
  | { verified: true; providerReference: string }
  | { verified: false; reason: string };

export type PaymentProviderId = "stripe" | "celoht";

export interface PaymentProvider {
  readonly id: PaymentProviderId;
  isConfigured(): boolean;
  createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResult>;
  verifyTransaction(providerReference: string): Promise<PaymentVerificationOutcome>;
}