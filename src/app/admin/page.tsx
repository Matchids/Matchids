import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminContactMessages, type AdminContactMessage } from "@/components/admin-contact-messages";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/sign-in?next=%2Fadmin");
  if (user.role !== "ADMIN") notFound();

  let initialMessages: AdminContactMessage[] = [];
  let initialTotal = 0;
  let initialError: string | undefined;
  try {
    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 25,
        select: {
          id: true,
          name: true,
          senderEmail: true,
          subject: true,
          message: true,
          isRead: true,
          status: true,
          notificationStatus: true,
          replyReference: true,
          repliedAt: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.count(),
    ]);
    initialMessages = messages.map((message) => ({
      ...message,
      createdAt: message.createdAt.toISOString(),
      repliedAt: message.repliedAt?.toISOString() ?? null,
    }));
    initialTotal = total;
  } catch {
    initialError = "The contact message database is not available. Apply the reviewed contact migration and configure PostgreSQL.";
  }

  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Administration</p>
      <h1>Matchids admin</h1>
      <div className="notice-banner" role="status">
        Admin access is restricted to database accounts with the ADMIN role. Other content-management and moderation actions are not enabled in this deployment.
      </div>
      <AdminContactMessages initialMessages={initialMessages} initialTotal={initialTotal} initialError={initialError} />
    </section>
  );
}