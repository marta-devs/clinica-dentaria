import { findConsultaByIdRepository } from 'database/consulta-repository'
import { type Request, type Response } from 'express'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const schema = z.number({ required_error: 'È obrigatório passar id na url' })

export async function findConsultaByIdController(request: Request, response: Response) {
  try {
    const id = Number(request.params.consulta_id)
    const isValidate = zodValidation(schema, id)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const consulta = await findConsultaByIdRepository(id)

    if (!consulta) {
      return response
        .status(401)
        .json('Esse consulta não existente no banco de dados')
    }

    return response.json(consulta)
  } catch (error) {
    return response.status(500).json(error)
  }
}
