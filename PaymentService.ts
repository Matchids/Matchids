import type {
  PaymentIntentRequest,
  PaymentIntentResult,
  PaymentProvider,
  PaymentProviderId,
  PaymentVerificationOutcome,
} from "./types";
import { StripeProvider } from "./providers/StripeProvider";
import { CeloHTProvider } from "./providers/CeloHTProvider";

/**
 * Central registry + orchestration for payment providers.
 *
 * Adding a new processor (a second card processor, a different Web3
 * provider) means writing one file in providers/ and registering it here —
 * nothing in checkout, orders, or donations needs to know the difference.
 */
export class PaymentService {
  private providers: Map<PaymentProviderId, PaymentProvider>;

  constructor() {
    this.providers = new Map([
      ["stripe", new StripeProvider()],
      ["celoht", new CeloHTProvider()],
    ]);
  }

  /** Only expose providers that actually have credentials configured. */
  listAvailableProviders(): PaymentProviderId[] {
    return [...this.providers.values()].filter((p) => p.isConfigured()).map((p) => p.id);
  }

  private getProvider(id: PaymentProviderId): PaymentProvider {
    const provider = this.providers.get(id);
    if (!provider) throw new Error(`Unknown payment provider: ${id}`);
    return provider;
  }

  async createIntent(
    providerId: PaymentProviderId,
    request: PaymentIntentRequest
  ): Promise<PaymentIntentResult> {
    return this.getProvider(providerId).createIntent(request);
  }

  /**
   * The only path allowed to confirm a payment. Always runs server-side
   * (API route / webhook handler) — never called from client code — and
   * always re-checks with the provider rather than trusting a status the
   * frontend reports.
   */
  async confirmPayment(
    providerId: PaymentProviderId,
    providerReference: string
  ): Promise<PaymentVerificationOutcome> {
    return this.getProvider(providerId).verifyTransaction(providerReference);
  }
}

export const paymentService = new PaymentService();
