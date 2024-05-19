/*
  Warnings:

  - A unique constraint covering the columns `[NCarteira]` on the table `Dentista` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Dentista` MODIFY `semanaAtendimento` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Dentista_NCarteira_key` ON `Dentista`(`NCarteira`);
