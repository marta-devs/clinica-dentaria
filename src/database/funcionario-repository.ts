import { prisma } from './connection'

export async function AddFuncionarioRepository(
  nome: string,
  email: string,
  telefone: string,
  senha: string
) {
  const funcionario = await prisma.funcionario.create({
    data: {
      nome,
      telefone,
      email,
    },
  })

  return funcionario
}

export async function FindFuncionarioByIDRepository(id: string) {
  const funcionario = await prisma.funcionario.findFirst({
    where: { id },
    select: {
      nome: true,
      email: true,
      telefone: true,
    },
  })
  return funcionario
}

export async function DeleteFuncionarioRepository(id: string) {
  await prisma.funcionario.delete({ where: { id } })
}

export async function UpdateFuncionarioRepository(
  id: string,
  nome: string,
  telefone: string,
  email: string,
  senha: string
) {
  const funcionario = await prisma.funcionario.update({
    where: {
      id,
    },
    data: {
      nome,
      email,
      telefone,
    },
  })
  return funcionario
}

export async function FindRecepionistabyCargo(cargo: string) {
  const recepionista = await prisma.funcionario.findMany({
    select: {
      nome: true,
      telefone: true,
      email: true,
    },
    where: {
      Usuario: {
        every: {
          cargo,
        },
      },
    },
  })
  return recepionista
}
