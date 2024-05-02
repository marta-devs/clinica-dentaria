import { type Request, type Response } from 'express'
import { addPacienteRepository } from '../../database/paciente-repository'

async function AddPacienteController(request: Request, response: Response) {
  try {
    const { nome, sobreNome, data_nasc, sexo, telefone, email, endereco } =
      request.body

    const paciente = await addPacienteRepository(
      nome,
      sobreNome,
      data_nasc,
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
