import { UpdatePacienteRepository } from 'database/paciente-repository'
import {Request, Response} from 'express'

export async function UpdatePacienteController(request:Request, response:Response) {

    const{id} = request.params
    const {
        nome,
        sobreNome,
        data_nasc,
        sexo,
        nacionalidade,
        telefone,
        email,
        endereco,
        usuarioId,
        senha}= request.body

    const paciente = await UpdatePacienteRepository(
    parseInt(id),
    nome,
    sobreNome,
    data_nasc,
    sexo,
    nacionalidade,
    telefone,
    email,
    endereco,
    senha,
    usuarioId
)
    return response.json(paciente)
    
}