import { zodValidation } from '../../utils/zodValidation';
import { type Request, type Response } from 'express'
import { findTipoConsultaByIdRepository, updateTipoConsultaByIdRepository } from '../../database/tipo-consulta-repository'
import z from 'zod'

const schema = z.object({
  nome: z
    .string({ required_error: 'O parametro nome do serviço obrigatório' })
    .min(1, { message: 'Preencha o campo nome do serviço' }),
  preco: z
    .number({ required_error: 'O parametro preço é obrigatório' }),
  desconto: z
    .number({ required_error: 'O parametro desconto é obrigatório' })
})

export async function updateTipoConsultaController(
  request: Request,
  response: Response
) {
  try {
    const id = parseInt(request.params.tiposConsulta_id)
    const dadoTipoConsulta = request.body

    const isValidate = zodValidation(schema, dadoTipoConsulta)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const tipoConsulta = await findTipoConsultaByIdRepository(id)

    if (!tipoConsulta) {
      return response.status(401).json({ mensagem: 'Esse serviço não existe no banco de dados' })
    }

    await updateTipoConsultaByIdRepository(
      id,
      dadoTipoConsulta.nome,
      dadoTipoConsulta.preco,
      dadoTipoConsulta.desconto
    )

    return response.json({ mensagem: 'Serviço editado com sucesso' })
  } catch (error) {
    return response.status(500).json(error)
  }
}