import type { PaymentIntentRequest, PaymentIntentResult, PaymentProvider, PaymentProviderId, PaymentVerificationOutcome } from "./types";
import { StripeProvider } from "./card/StripeProvider";
import { CeloHTProvider } from "./celoht/CeloHTProvider";

export class PaymentService {
  private readonly providers: Map<PaymentProviderId, PaymentProvider>;

  constructor() {
    this.providers = new Map<PaymentProviderId, PaymentProvider>([
      ["stripe", new StripeProvider()],
      ["celoht", new CeloHTProvider()],
    ]);
  }

  listAvailableProviders(): PaymentProviderId[] {
    return [...this.providers.values()].filter((provider) => provider.isConfigured()).map((provider) => provider.id);
  }

  async createIntent(providerId: PaymentProviderId, request: PaymentIntentRequest): Promise<PaymentIntentResult> {
    const provider = this.providers.get(providerId);
    if (!provider || !provider.isConfigured()) throw new Error("Payment provider is not operational.");
    return provider.createIntent(request);
  }

  async confirmPayment(providerId: PaymentProviderId, reference: string): Promise<PaymentVerificationOutcome> {
    const provider = this.providers.get(providerId);
    if (!provider || !provider.isConfigured()) return { verified: false, reason: "Payment provider is not operational." };
    return provider.verifyTransaction(reference);
  }
}

export const paymentService = new PaymentService();