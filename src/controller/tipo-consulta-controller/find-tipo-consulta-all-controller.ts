import { findTipoConsultaAllRepository } from 'database/tipo-consulta-repository'
import { type Request, type Response } from 'express'

export async function findTiposDeConsultaAllController(
  request: Request,
  response: Response
) {
  try {
    const filtro = request.query.filtro?.toString() || ''
    const page = Number(request.query.page)
    const limit = Number(request.query.limit)

    const tiposDeConsulta = await findTipoConsultaAllRepository(page, limit)

    const tiposConsultaFiltrado = tiposDeConsulta.filter(tipos =>
      tipos.tipo_consulta.toLowerCase().startsWith(filtro?.toLowerCase())
    )

    return response.json(tiposConsultaFiltrado)
  } catch (error) {
    return response.status(500).json(error)
  }
}
