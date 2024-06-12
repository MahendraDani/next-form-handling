/*
  Warnings:

  - Added the required column `occupation` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "occupation" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;
