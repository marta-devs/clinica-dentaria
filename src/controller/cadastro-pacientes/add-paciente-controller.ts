import { response, type Request, type Response } from 'express'
import { addPacienteRepository, findEmailAndTelefonePaciente, findPacienteByIdRepository } from '../../database/paciente-repository'
import { z } from 'zod'
import { zodValidation } from 'utils/zodValidation';
import moment from 'moment';


const Schema = z.object({
  nome: z.string({ required_error: 'preencha o campo nome' }),
  sobreNome: z.string({ required_error: 'preencha o campo sobre nome' }),
  data_nasc: z.string().date('formato de data inválido'),
  sexo: z.string({ required_error: 'seleciona um género' }),
  nacionalidade: z.string({ required_error: 'preencha o campo da nacionalidade' }),
  telefone: z.string({ required_error: 'preencha o campo telefone' }),
  email: z.string().email('email inválido'),
  endereco: z.string({ required_error: 'preencha o campo endereço' }),
  senha: z.string({ required_error: 'preencha o campo senha' })
})



async function AddPacienteController(request: Request, response: Response) {
  try {
    const usuario = request.body

    const isValidate = zodValidation(Schema, usuario)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const findPaciente = await findEmailAndTelefonePaciente(usuario.email, usuario.telefone)

    if (moment(usuario.data_nasc).isSameOrAfter('2023-12-31', 'year')) {
      return response.status(401).json({ mensagem: 'Essa data de nascimento muito recente!' })
    }

    if (findPaciente?.email == usuario.email) {
      return response.status(401).json({ mensagem: 'já existe um paciente com este email' })
    }

    if (findPaciente?.telefone == usuario.telefone) {
      return response.status(401).json({ mensagem: 'já existe um paciente com este telefone' })
    }


    const paciente = await addPacienteRepository(
      usuario.nome,
      usuario.sobreNome,
      usuario.data_nasc,
      usuario.sexo,
      usuario.nacionalidade,
      usuario.telefone,
      usuario.email,
      usuario.endereco,
      usuario.senha
    )

    console.log(paciente)
    return response.json(paciente)
  } catch (error) {
    return response.status(500).json(error)
  }
}

async function findPacienteByIdController(id: number) {

  try {

    const findPaciente = await findPacienteByIdRepository(id)
    return response.json(findPaciente)

  } catch (err) {
    return response.status(500).json(err)
  }

}

export { AddPacienteController, findPacienteByIdController }
