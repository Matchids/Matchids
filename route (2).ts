import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/payments/PaymentService";
import { prisma } from "@/lib/db/prisma";

/**
 * Shared webhook/confirmation endpoint. In production this should validate
 * the incoming request's signature per-provider (Stripe webhook signature,
 * or CeloHT's own signed callback) before trusting the payload — that
 * verification is an integration point left for whoever wires up the real
 * processor, flagged clearly rather than silently skipped.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const providerId = body.provider as "stripe" | "celoht" | undefined;
  const providerReference = body.providerReference as string | undefined;

  if (!providerId || !providerReference) {
    return NextResponse.json({ error: "Missing provider or providerReference." }, { status: 400 });
  }

  const outcome = await paymentService.confirmPayment(providerId, providerReference);

  if (!outcome.verified) {
    return NextResponse.json({ verified: false, reason: outcome.reason }, { status: 200 });
  }

  // Only once verification succeeds does the backend grant access / confirm
  // the donation. Left as a structural example — the paymentId lookup would
  // come from the intent created earlier in the flow.
  await prisma.paymentTransaction.updateMany({
    where: { providerReference },
    data: { verifiedByBackend: true },
  });

  return NextResponse.json({ verified: true });
}
