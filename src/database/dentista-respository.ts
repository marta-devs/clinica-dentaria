import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string'
import { prisma } from './connection'

export async function findDentistaByIdRepository(dentistaId: number) {
  const dentista = await prisma.dentista.findUnique({
    where: {
      id: dentistaId,
    },
  })

  return dentista
}

export async function findDentistaByNomeRepository(nome: string = '') {
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
  })
}

export async function findDentistaAllRepository() {
  const dentistas = await prisma.dentista.findMany()

  return dentistas.map((dentista) => {
    return {
      ...dentista,
      horaStart: convertHourMinutesToHourString(dentista?.horaStart),
      horaEnd: convertHourMinutesToHourString(dentista?.horaEnd),
    }
  })
}
