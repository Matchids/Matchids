import type {
  PaymentIntentRequest,
  PaymentIntentResult,
  PaymentProvider,
  PaymentVerificationOutcome,
} from "../types";

/**
 * CeloHT provider — integration point only.
 *
 * CeloHT is a dapp that lets people send and receive CELO and USDm on the
 * Celo blockchain. Matchids treats it as a Web3 payment provider for both
 * book purchases and Give Back donations.
 *
 * Nothing below is invented: no contract address, no ABI, no RPC endpoint,
 * no CeloHT API route. Those only get filled in once CeloHT publishes them
 * or shares them directly. Until then this provider reports itself as
 * "not configured" and Matchids' checkout hides the CeloHT option rather
 * than showing a payment method that can't actually run.
 *
 * When the real integration is ready, this file is the only place that
 * needs to change — createIntent() should call CeloHT's real API to create
 * a payment request, and verifyTransaction() should confirm the transaction
 * against the Celo blockchain (or against CeloHT's own verification
 * endpoint) before Matchids treats a purchase or donation as paid.
 */
export class CeloHTProvider implements PaymentProvider {
  readonly id = "celoht" as const;

  isConfigured(): boolean {
    return Boolean(process.env.CELOHT_API_BASE_URL && process.env.CELOHT_API_KEY);
  }

  async createIntent(_request: PaymentIntentRequest): Promise<PaymentIntentResult> {
    if (!this.isConfigured()) {
      throw new Error(
        "CeloHT is not configured yet. Set CELOHT_API_BASE_URL and CELOHT_API_KEY " +
          "once CeloHT provides real integration credentials — see .env.example."
      );
    }

    // Integration point: call CeloHT's real API here to create a payment
    // request for CELO or USDm and return whatever payload the checkout UI
    // needs (e.g. an address + amount, or a signed request link/QR code).
    throw new Error(
      "CeloHTProvider.createIntent is an integration point — implement the " +
        "real CeloHT API call here once endpoint details are available."
    );
  }

  async verifyTransaction(_providerReference: string): Promise<PaymentVerificationOutcome> {
    if (!this.isConfigured()) {
      return { verified: false, reason: "CeloHT provider is not configured." };
    }

    // Integration point: verify the transaction against the Celo blockchain
    // or CeloHT's verification endpoint. Must run server-side — the backend
    // is the only thing allowed to mark a Payment as confirmed.
    return {
      verified: false,
      reason: "CeloHTProvider.verifyTransaction is not yet implemented.",
    };
  }
}
