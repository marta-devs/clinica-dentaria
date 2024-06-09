import { FindFuncionarioByIDRepository, FindRecepionistabyCargo, findRecepcionistaByIdRepository } from 'database/funcionario-repository'
import { Request, Response } from 'express'

export async function findFuncionarioController(
  request: Request,
  response: Response
) {
  const { id } = request.params
  const funcionario = await FindFuncionarioByIDRepository(parseInt(id))
  return response.json(funcionario)
}


export async function findRecepcionistaController(request:Request,response:Response){
   const {cargo} = request.params
      const recepionista = await FindRecepionistabyCargo(cargo)
      return response.json(recepionista)
}

export async function FindRecepcionistaByIdController(request:Request,response:Response) {
  const {id} = request.params
  const recepcionista = await findRecepcionistaByIdRepository(parseInt(id))
  return response.json(recepcionista)
}