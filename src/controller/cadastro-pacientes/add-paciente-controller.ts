import { response, type Request, type Response } from 'express'
import { addPacienteRepository, findEmailAndTelefonePaciente, findPacienteByIdRepository } from '../../database/paciente-repository'
import { addCadastroSenhaUsuarioRepository } from "../../database/usuario-repository";
import { z } from 'zod'


const Schema = z.object({
  nome: z.string({required_error:'preencha o campo nome'}),
  sobreNome: z.string({required_error:'preencha o campo sobre nome'}),
  data_nasc: z.string().date('formato de data inválido'),
  sexo: z.string({required_error:'seleciona um género'}),
  nacionalidade: z.string({required_error:'preencha o campo da nacionalidade'}),
  telefone: z.string({required_error:'preencha o campo telefone'}),
  email: z.string().email('email inválido'),
  endereco: z.string({required_error:'preencha o campo endereço'})
})



async function AddPacienteController(request: Request, response: Response) {
  try {
    const { nome, sobreNome, data_nasc, sexo,nacionalidade, telefone, email, endereco,senha } =
      request.body
      
       const result =Schema.safeParse({
        nome : nome,
        sobreNome : sobreNome,
        data_nasc : data_nasc,
        sexo : sexo,
        nacionalidade:nacionalidade,
        telefone : telefone,
        email : email,
        endereco : endereco
      })
    type NovoPaciente= z.infer<typeof Schema>
    const np : NovoPaciente = result.data

    const findPaciente = await findEmailAndTelefonePaciente(email,telefone)
    if( findPaciente?.email == np.email ){
      return response.json({mensagem:'já existe um paciente com este email'})
    }

    if( findPaciente?.telefone == np.telefone ){
      return response.json({mensagem:'já existe um paciente com este telefone'})
    }


    const paciente = await addPacienteRepository(np.nome,np.sobreNome,np.data_nasc,np.sexo,np.nacionalidade,np.telefone,np.email, np.endereco,)
    await addCadastroSenhaUsuarioRepository(senha, paciente.id)
    return response.json(paciente)
  } catch (error) {
    return response.status(500).json(error)
  }
}

async function findPacienteByIdController(id:number) {

 try{
     
  const findPaciente = await findPacienteByIdRepository(id)
  return response.json(findPaciente)

 }catch(err){
    return response.status(500).json(err)
 }
  
}

export { AddPacienteController, findPacienteByIdController }
