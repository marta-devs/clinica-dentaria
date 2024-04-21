import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string'
import { type Dentista } from '../model/dentista'
import { prisma } from './connection'

export async function findDentistaByIdRepository(dentistaId: number) {
  const dentista = await prisma.dentista.findUnique({
    where: {
      id: dentistaId,
    },
  })

  return dentista
}

export async function findDentistaByNomeRepository(
  nome: string = ''
): Promise<Dentista[]> {
  const dentistas = await prisma.dentista.findMany({
    where: {
      nome: {
        contains: nome,
      },
    },
  })

  return dentistas.map((dentista) => {
    return {
      ...dentista,
      horaStart: convertHourMinutesToHourString(dentista?.horaStart),
      horaEnd: convertHourMinutesToHourString(dentista?.horaEnd),
    }
  }) as Dentista[]
}

export async function findDentistaAllRepository(
  nome: string = ''
): Promise<Dentista[]> {
  const dentistas = await prisma.dentista.findMany()

  return dentistas.map((dentista) => {
    return {
      ...dentista,
      horaStart: convertHourMinutesToHourString(dentista?.horaStart),
      horaEnd: convertHourMinutesToHourString(dentista?.horaEnd),
    }
  }) as Dentista[]
}
