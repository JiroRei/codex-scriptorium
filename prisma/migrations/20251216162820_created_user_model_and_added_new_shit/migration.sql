/*
  Warnings:

  - You are about to drop the column `user` on the `ArtComment` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `ArtLike` table. All the data in the column will be lost.
  - You are about to drop the column `creator` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `seriesId` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[c_seriesId,number]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `c_seriesId` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_seriesId_fkey";

-- AlterTable
ALTER TABLE "ArtComment" DROP COLUMN "user";

-- AlterTable
ALTER TABLE "ArtLike" DROP COLUMN "user";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "creator";

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "seriesId",
ADD COLUMN     "c_seriesId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Series";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComicSeries" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "genre" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComicSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentComics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentComics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WrittenSeries" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "genre" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WrittenSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "w_seriesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentWritten" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentWritten_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ComicSeries_creatorId_idx" ON "ComicSeries"("creatorId");

-- CreateIndex
CREATE INDEX "CommentComics_userId_idx" ON "CommentComics"("userId");

-- CreateIndex
CREATE INDEX "CommentComics_episodeId_idx" ON "CommentComics"("episodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_w_seriesId_number_key" ON "Chapter"("w_seriesId", "number");

-- CreateIndex
CREATE INDEX "Episode_c_seriesId_idx" ON "Episode"("c_seriesId");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_c_seriesId_number_key" ON "Episode"("c_seriesId", "number");

-- AddForeignKey
ALTER TABLE "ComicSeries" ADD CONSTRAINT "ComicSeries_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_c_seriesId_fkey" FOREIGN KEY ("c_seriesId") REFERENCES "ComicSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentComics" ADD CONSTRAINT "CommentComics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentComics" ADD CONSTRAINT "CommentComics_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WrittenSeries" ADD CONSTRAINT "WrittenSeries_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_w_seriesId_fkey" FOREIGN KEY ("w_seriesId") REFERENCES "WrittenSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentWritten" ADD CONSTRAINT "CommentWritten_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentWritten" ADD CONSTRAINT "CommentWritten_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtComment" ADD CONSTRAINT "ArtComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtLike" ADD CONSTRAINT "ArtLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
