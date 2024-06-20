import { convertHourStringToMinute } from 'utils/convert-hour-string-to-minute';
import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string';
import { findConsultasByDentistaIdEDataEscolhidoRepository } from "database/consulta-repository"
import { findDentistaByIdRepository } from "database/dentista-respository"
import { Request, Response } from "express"
import moment from 'moment';

export async function findHorariosLivresController(request: Request, response: Response) {
  const dentista_id = Number(request.params.dentista_id)
  let dataEscolhido = request.query.data_escolhido?.toString()

  const dataHoje = new Date().toISOString() //

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

  const consultas = await findConsultasByDentistaIdEDataEscolhidoRepository(dentista_id, dataEscolhido)

  const { horasDisponiveis } = calcularHorasDisponiveis(dentista, consultas, dataEscolhido)

  return response.json(horasDisponiveis)
}


const calcularHorasDisponiveis = (dentista: any, consultas: any[], dataEscolhido: any) => {
  const intervaloEntreAsHoras = 60 // 1hora
  let increment = dentista?.horaStart

  let horasDisponiveis = [] as string[]

  while (dentista?.horaEnd && increment && increment <= dentista?.horaEnd) {

    const consulta = consultas.find(consulta => consulta?.hora_consulta === increment)

    const hoje = moment(dataEscolhido).isSame(new Date().toISOString(), 'day')

    const passouDoTempo = convertHourStringToMinute(moment(new Date().toISOString()).format('HH:MM'))

    if (!consulta) {

      let horaEmString = convertHourMinutesToHourString(increment)
      horasDisponiveis.push(horaEmString)

      if (hoje && increment <= passouDoTempo) {
        console.log('increment: ' + increment)
        console.log('passou: ' + passouDoTempo)
        let horaEmString = convertHourMinutesToHourString(increment)
        horasDisponiveis = horasDisponiveis.filter((hora) => horaEmString !== hora)
      }
    }

    increment = intervaloEntreAsHoras + increment
  }

  return {
    horasDisponiveis
  }
}