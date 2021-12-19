/*
  Warnings:

  - Added the required column `icon` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "icon" TEXT NOT NULL,
ALTER COLUMN "profile" SET DEFAULT E'';
