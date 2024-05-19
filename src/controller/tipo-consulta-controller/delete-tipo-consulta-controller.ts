import { zodValidation } from '../../utils/zodValidation';
import { type Request, type Response } from 'express'
import { deleteTipoConsultaByIdRepository, findTipoConsultaByIdRepository, updateTipoConsultaByIdRepository } from '../../database/tipo-consulta-repository'

export async function deleteTipoConsultaController(
  request: Request,
  response: Response
) {
  try {
    const id = parseInt(request.params.tiposConsulta_id)

    const tipoConsulta = await findTipoConsultaByIdRepository(id)

    if (!tipoConsulta) {
      return response.status(401).json({ mensagem: 'Esse serviço não existe no banco de dados' })
    }

    await deleteTipoConsultaByIdRepository(id)

    return response.json({ mensagem: 'Serviço deletado com sucesso' })
  } catch (error) {
    return response.status(500).json(error)
  }
}