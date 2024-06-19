/*
  Warnings:

  - You are about to drop the column `count` on the `Dictionary` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JokeType" AS ENUM ('single', 'twopart');

-- CreateEnum
CREATE TYPE "JokeCategory" AS ENUM ('Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas');

-- AlterTable
ALTER TABLE "Dictionary" DROP COLUMN "count";

-- CreateTable
CREATE TABLE "Jokes" (
    "id" SERIAL NOT NULL,
    "joke_id" INTEGER NOT NULL,
    "category" "JokeCategory" NOT NULL,
    "type" "JokeType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jokes_pkey" PRIMARY KEY ("id")
);
