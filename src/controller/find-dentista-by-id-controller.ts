import { findDentistaByIdRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'
import { convertZodErrorInMessage } from 'utils/convert-zod-error-in-message'
import z from 'zod'

const schema = z.number({ required_error: 'È obrigatório passar id na url' })

export async function findDentistaById(request: Request, response: Response) {
  try {
    const id = Number(request.params.dentistaId)
    const isValido = schema.safeParse(id)

    if (!isValido.success) {
      const messageError = convertZodErrorInMessage(isValido)
      return response.status(403).json(messageError)
    }
    const dentista = await findDentistaByIdRepository(id)

    if (!dentista) {
      return response
        .status(401)
        .json('Esse dentista não existente no banco de dados')
    }

    return response.json(dentista)
  } catch (error) {
    return response.status(500).json(error)
  }
}
