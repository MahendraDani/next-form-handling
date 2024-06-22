/*
  Warnings:

  - You are about to drop the column `type` on the `Jokes` table. All the data in the column will be lost.
  - Added the required column `jokeType` to the `Jokes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jokes" DROP COLUMN "type",
ADD COLUMN     "jokeType" "JokeType" NOT NULL;
