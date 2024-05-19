import { findDentistaAllRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'

export async function findDentistasAllController(
  request: Request,
  response: Response
) {
  try {
    const page = Number(request.query.page)
    const limit = Number(request.query.limit)
    const dentistas = await findDentistaAllRepository(page, limit)

    return response.json(dentistas)
  } catch (error) {
    return response.status(500).json(error)
  }
}
