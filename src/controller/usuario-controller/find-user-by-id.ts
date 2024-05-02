import { type Request, type Response } from 'express'
import { findPacienteByUsuarioId } from 'database/usuario-repository'
import z from 'zod'
import { zodValidation } from 'utils/zodValidation'

const schema = z.string({ required_error: 'È obrigatório passar id na url' })

export async function FindUserByIdController(
  request: Request,
  response: Response
) {
  const id = request.params.id
  const isValidate = zodValidation(schema, id)

  if (isValidate) {
    return response.status(403).json({ mensagem: isValidate })
  }

  const user = await findPacienteByUsuarioId(id)

  return response.json(user)
}
