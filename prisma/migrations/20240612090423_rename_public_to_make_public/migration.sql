/*
  Warnings:

  - You are about to drop the column `public` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "public",
ADD COLUMN     "make_public" BOOLEAN NOT NULL DEFAULT false;
