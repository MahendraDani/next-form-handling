/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Feedback_id_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_userId_key" ON "Feedback"("userId");

-- CreateIndex
CREATE INDEX "Feedback_id_idx" ON "Feedback"("id");

-- CreateIndex
CREATE INDEX "Feedback_userId_idx" ON "Feedback"("userId");
