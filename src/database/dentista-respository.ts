import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string'
import { type Dentista } from '../model/dentista'
import { prisma } from './connection'

export async function findDentistaByIdRepository(
  dentistaId: number
): Promise<Dentista | null> {
  const dentista = await prisma.dentista.findUnique({
    where: {
      id: dentistaId,
    },
  })

  if (!dentista) return null

  return {
    ...dentista,
    horaStart: convertHourMinutesToHourString(dentista?.horaStart),
    horaEnd: convertHourMinutesToHourString(dentista?.horaEnd),
  }
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
