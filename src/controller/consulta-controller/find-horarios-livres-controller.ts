import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string';
import { findConsultasByDentistaIdEDataEscolhidoRepository } from "database/consulta-repository"
import { findDentistaByIdRepository } from "database/dentista-respository"
import { Request, Response } from "express"

export async function findHorariosLivresController(request: Request, response: Response) {
  const dentista_id = Number(request.params.dentista_id)
  let dataEscolhido = request.query.data_escolhido?.toString()
  const dataAtual = new Date()

  if (dataEscolhido && dataAtual >= new Date(dataEscolhido)) {
    return response.status(401).json({ mensagem: 'Não se pode agendar para uma data anterior' })
  }

  if (!dataEscolhido) {
    dataEscolhido = convertInOtherFormat()
  }

  const dentista = await findDentistaByIdRepository(dentista_id)

  if (!dentista) {
    return response.status(401).json({ mensagem: 'Dentista não existe na base de dados' })
  }

  const consultas = await findConsultasByDentistaIdEDataEscolhidoRepository(dentista_id, dataEscolhido)

  const { horasDiponiveis } = calcularHorasDisponiveis(dentista, consultas)

  return response.json(horasDiponiveis)
}


const calcularHorasDisponiveis = (dentista: any, consultas: any[]) => {
  const intervaloEntreAsHoras = 60 // 1hora
  let increment = dentista?.horaStart

  const horasDiponiveis = [] as string[]

  while (dentista?.horaEnd && increment && increment <= dentista?.horaEnd) {

    const isAgendado = consultas.some(consulta => consulta?.hora_consulta === increment)

    if (!isAgendado) {
      let horaEmString = convertHourMinutesToHourString(increment)
      horasDiponiveis.push(horaEmString)
    }
    increment = intervaloEntreAsHoras + increment
  }

  return {
    horasDiponiveis
  }
}

const convertInOtherFormat = () => new Intl.DateTimeFormat(['ban', 'id']).format(new Date()) 