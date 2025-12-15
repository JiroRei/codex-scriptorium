/*
  Warnings:

  - Added the required column `creatorName` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "creatorName" TEXT NOT NULL;
