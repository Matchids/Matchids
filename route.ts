import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const DonationInputSchema = z.object({
  amountCents: z.number().int().positive(),
  currency: z.enum(["USD", "EUR", "CELO", "USDM"]).default("USD"),
  campaignId: z.string().optional(),
  userId: z.string().optional(),
});

/**
 * POST /api/donations — records a pending donation before payment.
 * The donation only moves to CONFIRMED once the payment webhook verifies
 * the transaction server-side (see /api/payments/webhook).
 */
export async function POST(request: NextRequest) {
  const parsed = DonationInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const donation = await prisma.donation.create({
    data: { ...parsed.data, status: "PENDING" },
  });

  return NextResponse.json({ donation }, { status: 201 });
}
