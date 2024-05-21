import { prisma } from './connection'

export async function findTipoConsultaAllRepository(page: number, limit: number) {
  const tiposConsulta = await prisma.tipo_consulta.findMany({
    skip: page,
    take: limit
  })
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

export async function findTipoConsultaByIdRepository(tipoConsulta_id: number) {
  const tiposConsulta = await prisma.tipo_consulta.findUnique({
    where: {
      id: tipoConsulta_id
    }
  })
  return tiposConsulta
}


export async function updateTipoConsultaByIdRepository(
  tipoConsulta_id: number,
  tipo_consulta: string,
  preco: number,
  desconto: number
) {
  await prisma.tipo_consulta.update({
    where: {
      id: tipoConsulta_id
    },
    data: {
      tipo_consulta,
      preco,
      desconto
    }
  })
}

export async function deleteTipoConsultaByIdRepository(id: number) {
  await prisma.tipo_consulta.delete({
    where: {
      id
    }
  })

}
