-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_pacienteId_fkey`;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
