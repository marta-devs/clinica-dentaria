import { findConsultaByIdController } from 'controller/consulta-controller/find-consulta-by-id-controller'
import { findConsultaByIdRepository, updateConsultaRepository, updateStatusConsultaRepository } from 'database/consulta-repository'
import { pagamentoRepository } from 'database/pagementos-repository'
import {Request,Response} from 'express'




export async function AddPagamentosController(request:Request, response:Response ) {

    const {valor, forma, status,} = request.body
    const {id} = request.params

    const consult = await findConsultaByIdRepository(parseInt(id)) 
    
    if(consult?.status  == 'CANCELADA' || consult?.status == 'cancelada' || consult?.status == 'Cancelada'){
       return response.json({message:'Consulta cancelada, pagamento não pode ser realizado!'})
    }
    if(consult?.status  == 'FINALIZADA' || consult?.status == 'finalizada' || consult?.status =='Finalizada'){
        return response.json({message:'Consulta finalizada, pagamento não pode ser realizado!'})
     }

   const pagamento = await  pagamentoRepository(valor,forma,status,parseInt(id))
   const consultStatus = 'FINALIZADA'
   await updateStatusConsultaRepository(parseInt(id),consultStatus)
   
   return response.json(pagamento)
    
}
