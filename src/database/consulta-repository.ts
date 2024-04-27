import { prisma } from './connection'

export interface AddConsultaParam {
  observado: string
  hora_consulta: number
  data_consulta: string
  pacienteId: number
  dentistaId: number
  tipo_consultaId: number
}

export interface UpdateConsultaParam {
  id: number
  hora_consulta: number
  data_consulta: string
  dentistaId: number
}

export async function findConsultaByDataConsultaRepository(
  dataConsulta: string,
  horaConsulta: number
) {
  const consulta = await prisma.consulta.findFirst({
    where: {
      AND: [
        { data_consulta: dataConsulta },
        { hora_consulta: horaConsulta },
        { status: 'AGENDADA' },
      ],
    },
  })

  return consulta
}

export async function addConsultaRepository(param: AddConsultaParam) {
  console.log(param)
  const consulta = await prisma.consulta.create({
    data: {
      status: 'AGENDADA',
      observado: param.observado,
      hora_consulta: param.hora_consulta,
      data_consulta: param.data_consulta,
      pacienteId: param.pacienteId,
      dentistaId: param.dentistaId,
      tipo_consultaId: param.tipo_consultaId,
    },
  })

  console.log(consulta)
}

export async function findConsultaById(consultaId: number) {
  const consulta = await prisma.consulta.findUnique({
    where: {
      id: consultaId,
    },
  })

  return consulta
}

export async function updateConsultaRepository(param: UpdateConsultaParam) {
  await prisma.consulta.update({
    where: {
      id: param.id,
    },
    data: {
      hora_consulta: param.hora_consulta,
      data_consulta: param.data_consulta,
      dentistaId: param.dentistaId,
    },
  })
}
