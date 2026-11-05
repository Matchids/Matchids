CREATE TYPE "ContactMessageStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'REPLIED', 'ARCHIVED');
CREATE TYPE "ContactNotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sourceHash" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'NEW',
    "notificationStatus" "ContactNotificationStatus" NOT NULL DEFAULT 'PENDING',
    "replyReference" TEXT,
    "repliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");
CREATE INDEX "ContactMessage_isRead_createdAt_idx" ON "ContactMessage"("isRead", "createdAt");
CREATE INDEX "ContactMessage_sourceHash_createdAt_idx" ON "ContactMessage"("sourceHash", "createdAt");
CREATE INDEX "ContactMessage_senderEmail_createdAt_idx" ON "ContactMessage"("senderEmail", "createdAt");