import { UpdateFuncionarioRepository } from 'database/funcionario-repository'
import { Request } from 'express'
import { request } from 'http'
import { json } from 'stream/consumers'

export async function updateFuncionarioController(
  request: Request,
  response: Response
) {
  const { id } = request.params
  const { nome, telefone, email, senha } = request.body
  const funcionario = await UpdateFuncionarioRepository(
    id,
    nome,
    telefone,
    email,
    senha
  )
  return response.json(funcionario)
}
