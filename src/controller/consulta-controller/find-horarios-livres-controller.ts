import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string';
import { findConsultasByDentistaIdEDataEscolhidoRepository } from "database/consulta-repository"
import { findDentistaByIdRepository } from "database/dentista-respository"
import { Request, Response } from "express"
import moment from 'moment';

export async function findHorariosLivresController(request: Request, response: Response) {
  const dentista_id = Number(request.params.dentista_id)
  let dataEscolhido = request.query.data_escolhido?.toString()

  if (!dataEscolhido) {
    dataEscolhido = new Date().toISOString()
  }

  if (!moment(dataEscolhido).isSameOrAfter(new Date().toISOString(), 'day')) {
    return response.status(401).json({ mensagem: 'Não se pode agendar para uma data anterior' })
  }

  const dentista = await findDentistaByIdRepository(dentista_id)

  if (!dentista) {
    return response.status(401).json({ mensagem: 'Dentista não existe na base de dados' })
  }

  const dataConvertEmOutroFormato = moment(dataEscolhido).format('YYYY-MM-DD')

  const consultas = await findConsultasByDentistaIdEDataEscolhidoRepository(dentista_id, dataConvertEmOutroFormato)

  const { horasDisponiveis } = calcularHorasDisponiveis(dentista, consultas)

  return response.json(horasDisponiveis)
}


const calcularHorasDisponiveis = (dentista: any, consultas: any[]) => {
  const intervaloEntreAsHoras = 60 // 1hora
  let increment = dentista?.horaStart

  const horasDisponiveis = [] as string[]

  while (dentista?.horaEnd && increment && increment <= dentista?.horaEnd) {
    const isAgendado = consultas.find(consulta => consulta?.hora_consulta === increment)
    if (!isAgendado) {
      let horaEmString = convertHourMinutesToHourString(increment)
      horasDisponiveis.push(horaEmString)
    }
    increment = intervaloEntreAsHoras + increment
  }

  return {
    horasDisponiveis
  }
}

const convertInOtherFormat = () => new Intl.DateTimeFormat(['ban', 'id']).format(new Date()) 