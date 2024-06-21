import { findPagamentoByStatusRepository } from "database/pagementos-repository";
import { Request,  Response } from "express";

export async function findPagamentoByStatus(request:Request, response:Response) {

    const {status} = request.params

    const pagamentos = await findPagamentoByStatusRepository(status)
    return response.json(pagamentos)
    
}