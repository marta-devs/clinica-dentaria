import { findConsultaByUsuarioIdRepository } from "database/consulta-repository";
import { findPacienteByUsuarioId } from "database/usuario-repository";
import { Request, Response } from "express";

export async function findConsultaByUsuarioIdController(request: Request, response: Response) {
  try {
    const usuario_id = request.params.usuario_id
    const page = Number(request.query.page)
    const limit = Number(request.query.limit)
    const usuario = await findPacienteByUsuarioId(usuario_id)

    if (!usuario?.pacienteId) {
      return response.status(401).json({ mensagem: 'Usuario não existente na base de dados' })
    }
    
    const consultas = await findConsultaByUsuarioIdRepository(
      usuario.pacienteId,
      page,
      limit
    )

    return response.json(consultas)
  } catch (err) {
    return response.status(500).json({ mensagem: 'Ocorreu um erro interno' })
  }

}