import { FindPagementoByPacientName } from "database/pagementos-repository";
import { Request, Response } from "express";




export async function FindPagamentoByPacientNameController(request:Request, response:Response) {
    const {nome} = request.params
    const pagamento = await FindPagementoByPacientName(nome)
    return   response.json(pagamento).status(200)
} 