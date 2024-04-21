import { findTipoConsultaAllRepository } from 'database/tipo-consulta-repository'
import { type Request, type Response } from 'express'

export async function findTiposDeConsultaAllController(
  request: Request,
  response: Response
) {
  try {
    const tiposDeConsulta = await findTipoConsultaAllRepository()

    return response.json(tiposDeConsulta)
  } catch (error) {
    return response.status(500).json(error)
  }
}
