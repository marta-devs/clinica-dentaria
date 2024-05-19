import { findDentistaAllRepository, findDentistaByNomeRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const schema = z
  .string({
    required_error: 'Parametro nome não passado',
  })
  .min(1, { message: 'nome vazio' })

export async function findDentistasByFiltro(
  request: Request,
  response: Response
) {
  try {
    const filtro = request.query.filtro?.toString() || ''
    const page = Number(request.query.page)
    const limit = Number(request.query.limit)

    const dentistas = await findDentistaAllRepository(page, limit)

    const dentistasFiltrados = dentistas.filter(dentista =>
      dentista.nome.toLowerCase().startsWith(filtro.toLowerCase()) ||
      dentista.especialidade.toLowerCase().startsWith(filtro.toLowerCase()) ||
      dentista.NCarteira.toLowerCase().startsWith(filtro.toLowerCase())
    )

    return response.json(dentistasFiltrados)
  } catch (error) {
    return response.status(500).json(error)
  }
}
