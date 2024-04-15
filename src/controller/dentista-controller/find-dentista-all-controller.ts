import { findDentistaAllRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'

export async function findDentistasAllController(
  request: Request,
  response: Response
) {
  try {
    const dentistas = await findDentistaAllRepository()

    return response.json(dentistas)
  } catch (error) {
    return response.status(500).json(error)
  }
}
