import  {Request,Response} from "express";
import { addCadastroSenhaUsuarioRepository } from "../../database/usuario-repository";
import { AddPacienteController } from "../cadastro-pacientes/add-cadastro-controller";




    const paciente =  AddPacienteController
    const data = paciente
   






const cargo = "paciente"
const pacienteId =  data["id"]
export async function addCadastroSenhaUsuarioController(request:Request, response:Response) {


    const {senha} = request.body

    const usuario = await addCadastroSenhaUsuarioRepository(senha,cargo,pacienteId)

    return response.json(usuario)
    
}