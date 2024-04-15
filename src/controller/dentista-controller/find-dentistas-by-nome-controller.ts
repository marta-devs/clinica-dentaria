import { findDentistaByNomeRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'
import { convertZodErrorInMessage } from 'utils/convert-zod-error-in-message'
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
    const nome = request.query.nome?.toString()
    const isValido = schema.safeParse(nome)

    if (!isValido.success) {
      const messageError = convertZodErrorInMessage(isValido)
      return response.status(403).json(messageError)
    }

    const dentistas = await findDentistaByNomeRepository(nome)

    return response.json(dentistas)
  } catch (error) {
    return response.status(500).json(error)
  }
}
