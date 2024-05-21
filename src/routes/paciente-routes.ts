import { findPacientesAllController } from "controller/paciente-controller/find-paciente-all-controller";
import { findPacienteByUsuarioIdController } from "controller/paciente-controller/find-paciente-by-usuarioId-controller";
import Express from "express";

const route = Express.Router()
route.get('/paciente/:usuarioId', findPacienteByUsuarioIdController)
route.get('/pacientes', findPacientesAllController)
export default route