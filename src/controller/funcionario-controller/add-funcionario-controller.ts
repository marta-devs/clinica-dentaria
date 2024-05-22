import { json } from 'node:stream/consumers'
import { AddFuncionarioRepository } from '../../database/funcionario-repository'
import { Request, Response } from 'express'

export async function AddFuncionarioController(
  request: Request,
  response: Response
) {
  const { nome, telefone, email, senha } = request.body
  try {
    const funcionario = await AddFuncionarioRepository(
      nome,
      email,
      telefone,
      senha
    )
    return response.json(funcionario)
  } catch (error) {
    return response
      .status(400)
      .json({ message: 'erro ao se conectar com o banco de dados' })
  }
}
