import { findPacienteByUsuarioId } from "../../database/usuario-repository";
import { Request, Response } from "express";


export async function findPacienteByUsuarioIdController(request:Request, response:Response) {

    try{
        const id =  request.params.usuarioId
        const paciente = await findPacienteByUsuarioId(id)
        if(!paciente){
            return response.status(401).json({mensagem:"Paciente não existente"})
        }

        return response.json(paciente.paciente)
    }catch(err){

        return response.status(500).json({mensagem:"Erro no servidor!"})
    }
    
}