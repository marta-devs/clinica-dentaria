import { type Request, type Response } from 'express'
import { prisma } from '../../database/connection'

export async function FindUserByIdController(
  request: Request,
  response: Response
) {
  const { id } = request.params
  const user = await prisma.usuario.findFirst({
    where: {
      id,
    },
  })

  return response.json(user)
}
