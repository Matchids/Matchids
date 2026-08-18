import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/payments/PaymentService";

/**
 * CeloHT payment intent creation.
 * POST /api/payments/celoht
 *
 * Backend-only: creates the intent server-side so the client never
 * fabricates payment state. Returns 503 with a clear message while CeloHT
 * credentials aren't configured, instead of pretending the flow works.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const result = await paymentService.createIntent("celoht", body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "CeloHT is unavailable.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
