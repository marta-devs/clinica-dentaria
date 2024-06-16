/*
  Warnings:

  - You are about to drop the column `idPaciente` on the `pagamentos` table. All the data in the column will be lost.
  - Added the required column `consultaId` to the `Pagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pagamentos` DROP FOREIGN KEY `Pagamentos_idPaciente_fkey`;

-- AlterTable
ALTER TABLE `pagamentos` DROP COLUMN `idPaciente`,
    ADD COLUMN `consultaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pagamentos` ADD CONSTRAINT `Pagamentos_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
