import { prisma } from 'database/connection'
import { FindConsultasFinalizadasRepository } from 'database/consulta-repository'
import { Request, Response, response } from 'express'

export async function findConsultasFinalizadasController() {
  const consultasFinalizadas = await FindConsultasFinalizadasRepository()
  return response.json(consultasFinalizadas)
}
