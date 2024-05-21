import { findDentistaAllRepository } from 'database/dentista-respository'
import { findPacienteAllRepository } from 'database/paciente-repository'
import { type Request, type Response } from 'express'

export async function findPacientesAllController(
  request: Request,
  response: Response
) {
  try {

    const dentistas = await findPacienteAllRepository()

    return response.json(dentistas)
  } catch (error) {
    return response.status(500).json(error)
  }
}
