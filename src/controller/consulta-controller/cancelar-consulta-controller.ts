import {
  findConsultaById,
  updateStatusParaCanceladoRepository,
} from 'database/consulta-repository'
import { type Request, type Response } from 'express'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const schema = z.number({ required_error: 'O Parametro id é obrigatório' })

export async function cancelarConsultaController(
  request: Request,
  response: Response
) {
  try {
    const consulta_id = parseInt(request.params.consulta_id)
    const isValidate = zodValidation(schema, consulta_id)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const oldConsulta = await findConsultaById(consulta_id)

    if (!oldConsulta) {
      return response
        .status(401)
        .json({ mensagem: 'Essa consulta nunca foi feita' })
    }

    await updateStatusParaCanceladoRepository(consulta_id)

    return response.json({ mensagem: 'Consulta cancelada com sucesso!' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
