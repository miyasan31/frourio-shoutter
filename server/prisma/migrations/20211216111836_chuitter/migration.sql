/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follow` table. All the data in the column will be lost.
  - Added the required column `followingId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "followerId",
ADD COLUMN     "followingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Follow" ADD FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
