import { prisma } from './connection'
import { type TipoConsulta } from 'model/tipo-consulta'

export async function findTipoConsultaAllRepository(): Promise<TipoConsulta[]> {
  const tiposConsulta = await prisma.tipo_consulta.findMany()
  return tiposConsulta
}
