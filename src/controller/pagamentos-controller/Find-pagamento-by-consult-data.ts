import { findConsultaByDataConsultaRepository } from "database/consulta-repository";
import { findPagamentoByConsultData } from "database/pagementos-repository";
import { Request,Response } from "express";



export async function FindPagamentoByDataConsultController(request:Request, response:Response) {
    const {data} = request.params
    const pagamento = await findPagamentoByConsultData(data)
    return response.json(pagamento)
}