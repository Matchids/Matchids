import type {
  PaymentIntentRequest,
  PaymentIntentResult,
  PaymentProvider,
  PaymentVerificationOutcome,
} from "../types";

/**
 * Traditional card payment provider — shown here wired for Stripe as the
 * example processor. Swap this file (or add a sibling) for whichever card
 * processor Matchids actually connects; nothing else in the codebase
 * needs to change because checkout only talks to the PaymentProvider
 * interface, never to Stripe directly.
 *
 * No real Stripe SDK call is wired in yet — this is a structurally correct
 * stub so the integration point is obvious and the shape is right. Fill in
 * the actual `stripe.paymentIntents.create` / webhook verification once
 * real keys are configured in .env.
 */
export class StripeProvider implements PaymentProvider {
  readonly id = "stripe" as const;

  isConfigured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY);
  }

  async createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResult> {
    if (!this.isConfigured()) {
      throw new Error(
        "Card payments are not configured yet. Set STRIPE_SECRET_KEY (or your " +
          "chosen processor's key) in .env — see .env.example."
      );
    }

    // Integration point: call the real processor SDK here, e.g.
    //   const intent = await stripe.paymentIntents.create({ amount: request.amountCents, currency: request.currency });
    throw new Error(
      "StripeProvider.createIntent is an integration point — wire up the real " +
        "processor SDK call here."
    );
  }

  async verifyTransaction(_providerReference: string): Promise<PaymentVerificationOutcome> {
    if (!this.isConfigured()) {
      return { verified: false, reason: "Card payment provider is not configured." };
    }

    // Integration point: verify via the processor's webhook signature and
    // charge/paymentIntent status, never trust the client's word alone.
    return {
      verified: false,
      reason: "StripeProvider.verifyTransaction is not yet implemented.",
    };
  }
}
