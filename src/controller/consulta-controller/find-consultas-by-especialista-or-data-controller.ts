import { findTodasConsultasRepository } from "database/consulta-repository";
import { Request, Response } from "express";
import { convertHourMinutesToHourString } from "utils/convert-minutes-to-hour-string";

export async function findConsultaByEspecialistaOrDataController(request: Request, response: Response) {
  try {
    const filtro = request.query.filtro?.toString() || ''
    const page = Number(request.query?.page)
    const limit = Number(request.query?.limit)

    const consultas = await findTodasConsultasRepository(page, limit)

    const consultasFiltradas = consultas.filter(consulta =>
      consulta.dentista.nome.toLowerCase().startsWith(filtro?.toLowerCase())
      || consulta.data_consulta.toLowerCase().startsWith(filtro.toLowerCase())
      || consulta.dentista.especialidade.toLowerCase().startsWith(filtro.toLowerCase())
      || consulta.paciente.nome.toLowerCase().startsWith(filtro.toLowerCase())
    )

    const newConsultasFiltradas = consultasFiltradas.map(consulta => {
      return {
        ...consulta,
        hora_consulta: convertHourMinutesToHourString(consulta.hora_consulta),
      }
    })

    return response.json(newConsultasFiltradas)
  } catch (err) {
    return response.status(500).json({ mensagem: 'Ocorreu um erro interno' })
  }
}