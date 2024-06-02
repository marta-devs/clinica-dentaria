import {
  findConsultaByIdRepository,
  updateStatusConsultaRepository,
} from 'database/consulta-repository'
import { type Request, type Response } from 'express'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const schema = z.object({
  status: z
    .string({ required_error: 'O parametro status é obrigatório' })
    .min(1, { message: 'Preencha o campo status' }),
})

export async function atualizarStatusConsultaController(
  request: Request,
  response: Response
) {
  try {
    const consultaId = Number(request.params.consultaId)
    const dataConsulta = request.body
    const isValidate = zodValidation(schema, dataConsulta)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const oldConsulta = await findConsultaByIdRepository(consultaId)

    if (!oldConsulta) {
      return response
        .status(401)
        .json({ mensagem: 'Essa consulta nunca foi feita' })
    }

    await updateStatusConsultaRepository(consultaId, dataConsulta.status)

    return response.json({ mensagem: 'Alterado com sucesso!' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
