import { Router } from 'express'
import { AddPacienteController } from '../controller/cadastro-pacientes/add-cadastro-controller'
const routes = Router()

routes.post('/cadastro/paciente', AddPacienteController)

export default routes
