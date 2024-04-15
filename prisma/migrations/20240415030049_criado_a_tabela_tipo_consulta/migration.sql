-- CreateTable
CREATE TABLE `Tipo_consulta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_consulta` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `desconto` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
