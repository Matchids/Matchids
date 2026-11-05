import nodemailer from "nodemailer";
import { z } from "zod";
import type { ContactSubmission } from "@/lib/contact/validation";
import { getContactRecipient } from "@/lib/contact/config";

const EmailSchema = z.string().email().max(254);

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.EMAIL_FROM_ADDRESS?.trim();
  const to = getContactRecipient();

  if (!host || /[\r\n]/.test(host) || !Number.isInteger(port) || port < 1 || port > 65535) return null;
  if (!user || !password || !from || !EmailSchema.safeParse(from).success || !EmailSchema.safeParse(to).success) return null;

  return { host, port, user, password, from, to };
}

export function isContactEmailConfigured() {
  return getSmtpConfig() !== null;
}

export async function sendContactNotification(submission: ContactSubmission, messageId: string) {
  const config = getSmtpConfig();
  if (!config) return false;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: { user: config.user, pass: config.password },
  });

  try {
    await transporter.sendMail({
      from: { name: "Matchids Contact", address: config.from },
      to: config.to,
      replyTo: submission.email,
      subject: `Matchids contact: ${submission.subject}`,
      text: [
        `Contact message ${messageId}`,
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Subject: ${submission.subject}`,
        "",
        submission.message,
      ].join("\n"),
    });
    return true;
  } finally {
    transporter.close();
  }
}