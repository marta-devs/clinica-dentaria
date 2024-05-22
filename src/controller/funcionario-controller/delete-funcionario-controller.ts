import { DeleteFuncionarioRepository } from 'database/funcionario-repository'
import { Request, Response } from 'express'

export async function deleteFuncionarioController(
  request: Request,
  response: Response
) {
  const { id } = request.params
  await DeleteFuncionarioRepository(id)
  return response.json({ message: 'funcionario deletado com sucesso' })
}
