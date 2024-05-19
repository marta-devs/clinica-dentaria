import { findDentistaAllRepository, findDentistaByNomeRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const schema = z
  .string({
    required_error: 'Parametro nome não passado',
  })
  .min(1, { message: 'nome vazio' })

export async function findDentistasByNome(
  request: Request,
  response: Response
) {
  try {
    const nome = request.query.nome?.toString() || ''
    const isValidate = zodValidation(schema, nome)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const dentistas = await findDentistaAllRepository()

    const dentistasFiltrados = dentistas.filter(dentista =>
      dentista.nome.toLowerCase().startsWith(nome.toLowerCase())
    )

    return response.json(dentistasFiltrados)
  } catch (error) {
    return response.status(500).json(error)
  }
}
