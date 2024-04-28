import { type Request, type Response } from 'express'
import { addPacienteRepository } from '../../database/paciente-repository'

async function AddPacienteController(request: Request, response: Response) {
  try {
    const { nome } = request.body
    const { sobreNome } = request.body
    const { dataNasc } = request.body
    const { sexo } = request.body
    const { telefone } = request.body
    const { email } = request.body
    const { endereco } = request.body
    const paciente = await addPacienteRepository(
      nome,
      sobreNome,
      dataNasc,
      sexo,
      telefone,
      email,
      endereco
    )
    return response.json(paciente)
  } catch (error) {
    return response.status(500).json(error)
  }
}
export { AddPacienteController }
