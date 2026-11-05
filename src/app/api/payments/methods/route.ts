import { NextResponse } from "next/server";
import { paymentService } from "@/lib/payments/PaymentService";

export async function GET() {
  return NextResponse.json({ providers: paymentService.listAvailableProviders() });
}