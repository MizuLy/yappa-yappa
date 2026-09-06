/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "comment_images" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "position" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comment_images_commentId_idx" ON "comment_images"("commentId");

-- AddForeignKey
ALTER TABLE "comment_images" ADD CONSTRAINT "comment_images_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
