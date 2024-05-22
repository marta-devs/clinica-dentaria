import { FindFuncionarioByIDRepository } from 'database/funcionario-repository'
import { Request, Response } from 'express'

export async function findFuncionarioController(
  request: Request,
  response: Response
) {
  const { id } = request.params
  const funcionario = await FindFuncionarioByIDRepository(id)
  return response.json(funcionario)
}
