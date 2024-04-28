/*
  Warnings:

  - You are about to drop the `paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `consulta` DROP FOREIGN KEY `Consulta_pacienteId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `usuario_pacienteId_fkey`;

-- DropTable
DROP TABLE `paciente`;

-- CreateTable
CREATE TABLE `pacienttes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `sobreNome` VARCHAR(191) NOT NULL,
    `data_nasc` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `pacienttes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `pacienttes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
