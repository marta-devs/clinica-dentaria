import { findAllConsultRepository } from 'database/consulta-repository'
import { findPacienteByUsuarioId } from 'database/usuario-repository'
import {Request, Response} from 'express'



export async function findAllConsultsController(request:Request, response:Response){
    const {id} = request.params

    const idPaciente = async function getIdPacienteByUsuarioID() {
        
        const pacienteId = await findPacienteByUsuarioId(id)

        return pacienteId?.id

    }
    
   try{

    const consult = await findAllConsultRepository(parseInt(id))
   
    return response.json(consult)
   }catch(err){
    return response.status(500).json({mensagem:'falha ao se conectar com o servidor',err})
   }
}