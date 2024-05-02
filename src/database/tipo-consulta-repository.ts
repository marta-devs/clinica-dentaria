import { prisma } from './connection'

export async function findTipoConsultaAllRepository() {
  const tiposConsulta = await prisma.tipo_consulta.findMany()
  return tiposConsulta
}
