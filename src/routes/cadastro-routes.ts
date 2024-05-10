import { Router } from 'express'
import { AddPacienteController, findPacienteByIdController } from '../controller/cadastro-pacientes/add-paciente-controller'
const routes = Router()

routes.post('/cadastro/paciente', AddPacienteController)
routes.get('/selecionar/paciente/:id',findPacienteByIdController)
export default routes
