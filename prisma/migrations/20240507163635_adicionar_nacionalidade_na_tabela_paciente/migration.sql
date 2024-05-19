/*
  Warnings:

  - Added the required column `nacionalidade` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Paciente` ADD COLUMN `nacionalidade` VARCHAR(191) NOT NULL;
