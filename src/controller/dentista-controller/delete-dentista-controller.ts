import { deleteDentistaRepository, findDentistaByIdRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'
import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const schema = z.number({ required_error: 'È obrigatório passar id na url' })

export async function deleteDentistaController(request: Request, response: Response) {
  try {
    const id = Number(request.params.dentistaId)
    const isValidate = zodValidation(schema, id)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const dentista = await findDentistaByIdRepository(id)

    if (!dentista) {
      return response
        .status(401)
        .json({ mensagem: 'Dentista não existente no banco de dados' })
    }

    await deleteDentistaRepository(id)

    return response.json({ mensagem: 'Dentista removido com sucesso' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
