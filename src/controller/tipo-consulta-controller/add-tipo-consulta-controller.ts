import { zodValidation } from '../../utils/zodValidation';
import { type Request, type Response } from 'express'
import { addTipoConsultaRepository } from '../../database/tipo-consulta-repository'
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

export async function addTipoConsultaController(
  request: Request,
  response: Response
) {
  try {
    const dadoTipoConsulta = request.body

    const isValidate = zodValidation(schema, dadoTipoConsulta)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    await addTipoConsultaRepository(
      dadoTipoConsulta.nome,
      dadoTipoConsulta.preco,
      dadoTipoConsulta.desconto
    )

    return response.json({ mensagem: 'Serviço adicionado com sucesso' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
