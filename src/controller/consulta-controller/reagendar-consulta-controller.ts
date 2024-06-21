import {
  findConsultaByDataConsultaRepository,
  findConsultaByIdRepository,
  updateConsultaRepository,
} from 'database/consulta-repository'
import { findDentistaByIdRepository } from 'database/dentista-respository'
import { type Request, type Response } from 'express'
import moment from 'moment'
import { convertHourStringToMinute } from 'utils/convert-hour-string-to-minute'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'
import { findConsultaByIdController } from './find-consulta-by-id-controller'

const schema = z.object({
  id: z.number({ required_error: 'O Parametro id é obrigatório' }),
  observado: z.string().optional(),
  hora_consulta: z
    .number({ required_error: 'O parametro hora_consulta é obrigatório' })
    .min(1, { message: 'Preencha o campo hora de consulta' }),
  data_consulta: z
    .string({ required_error: 'O parametro data_consulta é obrigatório' })
    .date('Data da consulta invalida.'),
  dentistaId: z
    .number({ required_error: 'O parametro dentistaId é obrigatório' })
    .int({ message: 'O campo dentistaId deve ser inteiro' }),
})

export async function reagendarConsultaController(
  request: Request,
  response: Response) {
  const {data_consulta,tipo_consultaId,dentistaId, hora_consulta,id} = request.body

  try {
    const dataConsulta = request.body

    const consulta = {
      ...dataConsulta,
      data_consulta: moment(dataConsulta.data_consulta).format('YYYY-MM-DD')
    }

    const isValidate = zodValidation(schema, consulta)

   /* if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const oldConsulta = await findConsultaByIdRepository(dataConsulta.id)

    if (!oldConsulta) {
      return response.status(401).json({ mensagem: 'Essa consulta nunca foi feita' })
    }

   const horaConsultaInFormatNumber = convertHourStringToMinute(
      dataConsulta.hora_consulta
    )

    const oldConsultas = await findConsultaByDataConsultaRepository(
      data_consulta,hora_consulta
      
    )*//*

    if (oldConsultas) {
      return response.status(401).json({ mensagem: 'Horario já preenchido' })
    }

    if (!moment(dataConsulta.data_consulta).isSameOrAfter(new Date().toISOString(), 'day')) {
      return response.status(401).json({ mensagem: 'Já não se pode fazer marcação de data passada' })
    }

    const dentista = await findDentistaByIdRepository(dataConsulta.dentistaId)

    if (!dentista) {
      return response.status(401).json({ mensagem: 'Esse dentista não encontrado no banco' })
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
    }*/

    await updateConsultaRepository({
       id,
       data_consulta,
       hora_consulta,
       dentistaId,
       tipo_consultaId
    })

    return response.json({ mensagem: 'Reagendado com sucesso!' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
