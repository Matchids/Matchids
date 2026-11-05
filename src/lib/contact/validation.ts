import { z } from "zod";

const plainText = (max: number, min = 1) => z.string()
  .transform((value) => value.normalize("NFC").replace(/\u0000/g, "").trim())
  .pipe(z.string().min(min).max(max).refine((value) => !/[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)));

export const ContactSubmissionSchema = z.object({
  name: plainText(80),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  subject: plainText(120, 3).refine((value) => !/[\r\n]/.test(value)),
  message: z.string()
    .transform((value) => value.normalize("NFC").replace(/\u0000/g, "").replace(/\r\n?/g, "\n").trim())
    .pipe(z.string().min(10).max(5000).refine((value) => !/[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))),
  website: z.string().max(0).optional(),
});

export type ContactSubmission = Omit<z.infer<typeof ContactSubmissionSchema>, "website">;