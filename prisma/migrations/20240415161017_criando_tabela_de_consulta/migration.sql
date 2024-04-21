-- CreateTable
CREATE TABLE `Consulta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `observado` VARCHAR(191) NOT NULL,
    `hora_consulta` INTEGER NOT NULL,
    `data_consulta` DATETIME(3) NOT NULL,
    `pacienteId` INTEGER NOT NULL,
    `dentistaId` INTEGER NOT NULL,
    `tipo_consultaId` INTEGER NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_alteracao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_dentistaId_fkey` FOREIGN KEY (`dentistaId`) REFERENCES `Dentista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_tipo_consultaId_fkey` FOREIGN KEY (`tipo_consultaId`) REFERENCES `Tipo_consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
