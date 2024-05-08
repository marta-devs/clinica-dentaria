/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Paciente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Paciente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Paciente_telefone_key` ON `Paciente`(`telefone`);

-- CreateIndex
CREATE UNIQUE INDEX `Paciente_email_key` ON `Paciente`(`email`);
