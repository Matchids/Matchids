/**
 * Matchids payment abstraction layer — shared types.
 *
 * Design rule: the frontend never gets to declare a payment "successful".
 * Every provider implementation returns a status that the backend then
 * verifies independently before granting access or confirming a donation.
 * See PaymentService.confirmPayment().
 */

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
  /** Internal Payment.id this intent maps to */
  paymentId: string;
  /** Whatever the provider needs the client to render/act on next
   *  (e.g. a Stripe client secret, or a CeloHT payment request/QR payload).
   *  Left as unknown on purpose — each provider defines its own shape. */
  clientPayload: unknown;
  provider: PaymentProviderId;
}

export type PaymentVerificationOutcome =
  | { verified: true; providerReference: string }
  | { verified: false; reason: string };

export type PaymentProviderId = "stripe" | "celoht";

/**
 * Every payment provider — card processor or Web3 — implements this same
 * interface, so adding a new processor never touches checkout UI or the
 * order/donation logic.
 */
export interface PaymentProvider {
  readonly id: PaymentProviderId;

  /** Whether this provider has real credentials configured right now. */
  isConfigured(): boolean;

  /** Create a payment intent with the provider and return what the client needs. */
  createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResult>;

  /**
   * Independently verify a payment/transaction with the provider (webhook
   * payload, or on-chain transaction lookup for CeloHT). This is the ONLY
   * source of truth for whether a payment succeeded — never the client.
   */
  verifyTransaction(providerReference: string): Promise<PaymentVerificationOutcome>;
}
