import { addDentistaRepository, findDentistaByIdRepository, findDentistaByNCarteiraRepository } from 'database/dentista-respository';
import { zodValidation } from '../../utils/zodValidation';
import { type Request, type Response } from 'express'
import { convertHourStringToMinute } from 'utils/convert-hour-string-to-minute';
import z from 'zod'

const schema = z.object({
  nome: z
    .string({ required_error: 'O parametro nome do serviço obrigatório' })
    .min(1, { message: 'Preencha o campo nome' }),
  especialidade: z
    .string({ required_error: 'O parametro especialidade obrigatório' })
    .min(1, { message: 'Preencha o campo nome do especialidade' }),
  NCarteira: z
    .string({ required_error: 'O parametro NCarteira obrigatório' })
    .min(1, { message: 'Preencha o campo NCarteira' }),
  status: z
    .string({ required_error: 'O parametro status obrigatório' })
    .min(1, { message: 'Preencha o campo status' })
    .optional(),
  horaStart: z
    .string({ required_error: 'O parametro horaStart obrigatório' })
    .min(1, { message: 'Preencha o campo horaStart' }),
  horaEnd: z
    .string({ required_error: 'O parametro especialidade obrigatório' })
    .min(1, { message: 'Preencha o campo horaEnd' }),
})

export async function addDentistaController(
  request: Request,
  response: Response
) {
  try {
    const dadoDentista = request.body

    const isValidate = zodValidation(schema, dadoDentista)

    if (isValidate) {
      return response.status(403).json({ mensagem: isValidate })
    }

    const horaStartInNumber = convertHourStringToMinute(dadoDentista.horaStart)
    const horaEndInNumber = convertHourStringToMinute(dadoDentista.horaEnd)


    const dentista = await findDentistaByNCarteiraRepository(dadoDentista.NCarteira)

    if (dentista) {
      return response.status(401).json({ mensagem: 'Dentista já existe na base de dados' })
    }

    await addDentistaRepository(
      dadoDentista.nome,
      dadoDentista.especialidade,
      dadoDentista.NCarteira,
      horaStartInNumber,
      horaEndInNumber
    )

    return response.json({ mensagem: 'Dentista adicionado com sucesso' })
  } catch (error) {
    return response.status(500).json(error)
  }
}
