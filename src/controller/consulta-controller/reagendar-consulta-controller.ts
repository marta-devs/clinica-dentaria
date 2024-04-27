import {
  findConsultaByDataConsultaRepository,
  findConsultaById,
  updateConsultaRepository,
} from 'database/consulta-repository'
import { findDentistaByIdRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'
import { convertHourStringToMinute } from 'utils/convert-hour-string-to-minute'
import { convertZodErrorInMessage } from 'utils/convert-zod-error-in-message'
import z from 'zod'

const schema = z.object({
  id: z.number({ required_error: 'O Parametro id é obrigatório' }),
  observado: z.string().optional(),
  hora_consulta: z
    .string({ required_error: 'O parametro hora_consulta é obrigatório' })
    .min(1, { message: 'Preencha o campo hora de consulta' }),
  data_consulta: z
    .string({ required_error: 'O parametro data_consulta é obrigatório' })
    .min(1, { message: 'Preencha o campo data de consulta' }),
  dentistaId: z
    .number({ required_error: 'O parametro dentistaId é obrigatório' })
    .int({ message: 'O campo dentistaId deve ser inteiro' }),
})

export async function reagendarConsultaController(
  request: Request,
  response: Response
) {
  try {
    const dataConsulta = request.body
    const isValido = schema.safeParse(dataConsulta)

    if (!isValido.success) {
      const messageError = convertZodErrorInMessage(isValido)
      return response.status(403).json({ mensagem: messageError })
    }

    const oldConsulta = await findConsultaById(dataConsulta.id)

    if (!oldConsulta) {
      return response
        .status(401)
        .json({ mensagem: 'Essa consulta nunca foi feita' })
    }

    const horaConsultaInFormatNumber = convertHourStringToMinute(
      dataConsulta.hora_consulta
    )

    const oldConsultas = await findConsultaByDataConsultaRepository(
      dataConsulta.data_consulta,
      horaConsultaInFormatNumber
    )

    if (oldConsultas) {
      return response.status(401).json({ mensagem: 'Horario já preenchido' })
    }

    const dentista = await findDentistaByIdRepository(dataConsulta.dentistaId)

    if (!dentista) {
      return response
        .status(401)
        .json({ mensagem: 'Esse dentista não encontrado no banco' })
    }

    if (horaConsultaInFormatNumber >= dentista.horaEnd) {
      return response.status(401).json({
        mensagem: 'Escolhe outro dentista. Porque já passou a escala desse.',
      })
    }

    if (horaConsultaInFormatNumber < dentista.horaStart) {
      return response.status(401).json({
        mensagem: 'Não podes agendar fora da escala de horario do dentista',
      })
    }

    await updateConsultaRepository({
      id: dataConsulta.id,
      data_consulta: dataConsulta.data_consulta,
      hora_consulta: horaConsultaInFormatNumber,
      dentistaId: dentista.id,
    })

    return response.json({ mensagem: 'Reagendado com sucesso!' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
