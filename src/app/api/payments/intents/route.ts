import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const IntentSchema = z.object({
  provider: z.enum(["stripe", "celoht"]),
  amountCents: z.number().int().positive().max(10_000_000),
  currency: z.enum(["USD", "EUR", "CELO", "USDM"]),
  purpose: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("book_purchase"), orderId: z.string().min(1) }),
    z.object({ kind: z.literal("donation"), donationId: z.string().min(1), campaignId: z.string().optional() }),
  ]),
});

export async function POST(request: NextRequest) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = IntentSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payment request." }, { status: 400 });
  return NextResponse.json(
    { error: "Checkout is unavailable until orders, provider intents, and server-side verification are operational." },
    { status: 503 }
  );
}