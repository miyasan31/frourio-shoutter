/*
  Warnings:

  - A unique constraint covering the columns `[userId,followingId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Retweet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follow.userId_followingId_unique" ON "Follow"("userId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_tweetId_unique" ON "Like"("userId", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "Retweet.userId_tweetId_unique" ON "Retweet"("userId", "tweetId");
