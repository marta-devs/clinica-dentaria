import { prisma } from './connection'

export interface ConsultaParam {
  observado: string
  hora_consulta: number
  data_consulta: string
  pacienteId: number
  dentistaId: number
  tipo_consultaId: number
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

export async function addConsultaRepository(param: ConsultaParam) {
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
