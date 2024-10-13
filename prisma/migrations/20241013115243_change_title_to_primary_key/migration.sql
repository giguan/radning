/*
  Warnings:

  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY;

-- CreateIndex
CREATE UNIQUE INDEX `Post_title_key` ON `Post`(`title`);
