import { convertHourMinutesToHourString } from 'utils/convert-minutes-to-hour-string'
import { prisma } from './connection'

export async function findDentistaByIdRepository(dentistaId: number) {
  const dentista = await prisma.dentista.findUnique({
    where: {
      id: dentistaId
    }
  })

  return dentista
}

export async function findDentistaByNCarteiraRepository(NCarteira: string) {
  const dentista = await prisma.dentista.findFirst({
    where: {
      NCarteira
    }
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

export async function findDentistaAllRepository(page: number, limit: number) {
  const dentistas = await prisma.dentista.findMany({
    skip: page,
    take: limit,
  })

  return dentistas.map((dentista) => {
    return {
      ...dentista,
      horaStart: convertHourMinutesToHourString(dentista?.horaStart),
      horaEnd: convertHourMinutesToHourString(dentista?.horaEnd),
    }
  })
}

export async function addDentistaRepository(
  nome: string,
  especialidade: string,
  email: string,
  telefone: string,
  endereco: string,
  NCarteira: string,
  horaStart: number,
  horaEnd: number
) {

  await prisma.dentista.create({
    data: {
      nome,
      especialidade,
      NCarteira,
      status: 'ACTIVO',
      semanaAtendimento: '',
      horaStart,
      horaEnd,
      email,
      telefone,
      endereco,
    }
  })
}

export async function updateDentistaRepository(
  id: number,
  nome: string,
  especialidade: string,
  email: string,
  telefone: string,
  endereco: string,
  NCarteira: string,
  horaStart: number,
  horaEnd: number
) {


  console.log(NCarteira)

  await prisma.dentista.update({
    where: {
      id
    },
    data: {
      nome,
      especialidade,
      NCarteira,
      horaStart,
      horaEnd,
      email,
      telefone,
      endereco
    }
  })

}

export async function deleteDentistaRepository(id: number) {
  await prisma.dentista.delete({
    where: {
      id
    },
  })
}