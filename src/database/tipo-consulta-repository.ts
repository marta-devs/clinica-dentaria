import { prisma } from './connection'

export async function findTipoConsultaAllRepository() {
  const tiposConsulta = await prisma.tipo_consulta.findMany()
  return tiposConsulta
}

export async function addTipoConsultaRepository(tipo_consulta: string, preco: number, desconto: number) {
  await prisma.tipo_consulta.create({
    data: {
      tipo_consulta,
      preco,
      desconto
    }
  })
}