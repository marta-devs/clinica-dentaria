import { findAllPagamento } from "database/pagementos-repository";
import { Request,Response } from "express";



export async function FindAllPagamentoConstroller(request:Request, response:Response) {

    const {num} = request.params
    const pagamento = await findAllPagamento(parseInt(num))
    return response.json(pagamento)
    
}
