-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_pacienteId_fkey`;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `pacienteId` INTEGER NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
