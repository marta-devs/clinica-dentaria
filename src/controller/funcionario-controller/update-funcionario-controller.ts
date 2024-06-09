import { UpdateFuncionarioRepository } from 'database/funcionario-repository'
import { Request, Response } from 'express'


export async function updateFuncionarioController(
  request: Request,
  response: Response
) {
  const { id } = request.params
  const { nome, telefone, email, senha } = request.body
  const funcionario = await UpdateFuncionarioRepository(
    parseInt(id),
    nome,
    telefone,
    email,
    senha
  )
  return response.json(funcionario)
}
