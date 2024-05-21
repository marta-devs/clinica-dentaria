import {
  addConsultaRepository,
  findConsultaByDataConsultaRepository,
} from 'database/consulta-repository'
import { findDentistaByIdRepository } from 'database/dentista-respository'
import { findPacienteByUsuarioId } from 'database/usuario-repository'
import { type Request, type Response } from 'express'
import { convertHourStringToMinute } from 'utils/convert-hour-string-to-minute'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const schema = z.object({
  observado: z.string().optional(),
  hora_consulta: z
    .string({ required_error: 'O parametro hora_consulta é obrigatório' })
    .min(1, { message: 'Preencha o campo hora de consulta' }),
  data_consulta: z
    .string({ required_error: 'O parametro data_consulta é obrigatório' })
    .min(1, { message: 'Preencha o campo data de consulta' }),
  tipo_consultaId: z
    .number({ required_error: 'O parametro tipo_consultaId é obrigatório' })
    .int({ message: 'O campo tipo_consultaId deve ser inteiro' }),
  usuarioId: z
    .string({ required_error: 'O parametro usuarioId é obrigatório' })
    .min(1, { message: 'O campo usuarioId deve ser preenchido' }),
  dentistaId: z
    .number({ required_error: 'O parametro dentistaId é obrigatório' })
    .int({ message: 'O campo dentistaId deve ser inteiro' }),
})

export async function addConsultaController(
  request: Request,
  response: Response
) {
  try {
    const dataConsulta = request.body
    const isValidate = zodValidation(schema, dataConsulta)

    if (isValidate) {
      console.log(isValidate)
      return response.status(403).json({ mensagem: isValidate })
    }

    const horaConsultaInFormatNumber = convertHourStringToMinute(
      dataConsulta.hora_consulta
    )

    const oldConsulta = await findConsultaByDataConsultaRepository(
      dataConsulta.data_consulta,
      horaConsultaInFormatNumber
    )

    if (oldConsulta) {
      return response.status(401).json({ mensagem: 'Já foi feita consulta' })
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

    const usuario = await findPacienteByUsuarioId(dataConsulta.usuarioId)

    if (!usuario) {
      return response.status(401).json({
        mensagem: 'paciente não existe na base de dados',
      })
    }

    await addConsultaRepository({
      data_consulta: dataConsulta.data_consulta,
      hora_consulta: horaConsultaInFormatNumber,
      dentistaId: dentista.id,
      pacienteId: usuario.pacienteId || 0,
      observado: dataConsulta.observado,
      tipo_consultaId: dataConsulta.tipo_consultaId,
    })

    return response.json({ messagem: 'Agendado com sucesso!' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
