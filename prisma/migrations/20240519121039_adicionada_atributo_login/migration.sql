/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `login` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_login_key` ON `Usuario`(`login`);
