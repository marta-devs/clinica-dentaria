import { type Request, type Response } from 'express'
import { findPacienteByUsuarioId } from 'database/usuario-repository'
import z from 'zod'
import { convertZodErrorInMessage } from 'utils/convert-zod-error-in-message'

const schema = z.string({ required_error: 'È obrigatório passar id na url' })

export async function FindUserByIdController(
  request: Request,
  response: Response
) {
  const id = request.params.id
  const isValido = schema.safeParse(id)

  if (!isValido.success) {
    const messageError = convertZodErrorInMessage(isValido)
    return response.status(403).json({ mensagem: messageError })
  }

  const user = await findPacienteByUsuarioId(isValido)

  return response.json(user)
}
