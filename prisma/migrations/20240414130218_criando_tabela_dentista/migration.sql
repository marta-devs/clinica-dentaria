/*
  Warnings:

  - The primary key for the `Paciente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Paciente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `pacienteId` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_pacienteId_fkey`;

-- AlterTable
ALTER TABLE `Paciente` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Usuario` MODIFY `pacienteId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Dentista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `especialidade` VARCHAR(191) NOT NULL,
    `NCarteira` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `semanaAtendimento` VARCHAR(191) NOT NULL,
    `horaStart` INTEGER NOT NULL,
    `horaEnd` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
