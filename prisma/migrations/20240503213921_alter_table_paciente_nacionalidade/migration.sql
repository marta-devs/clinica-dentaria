/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Paciente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nacionalidade` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paciente` ADD COLUMN `nacionalidade` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Paciente_email_key` ON `Paciente`(`email`);
