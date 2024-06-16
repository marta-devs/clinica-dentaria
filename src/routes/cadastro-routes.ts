import { Router } from 'express'
import {
  AddPacienteController,
  findPacienteByIdController,
} from '../controller/cadastro-pacientes/add-paciente-controller'
import { AddFuncionarioController } from '../controller/funcionario-controller/add-funcionario-controller'
import { AddPagamentosController } from 'controller/pagamentos-controller/add-pamentos-controller'
const routes = Router()

routes.post('/cadastro/paciente', AddPacienteController)
routes.get('/selecionar/paciente/:id', findPacienteByIdController)
routes.post('/cadastro/funcionario', AddFuncionarioController)
routes.post('/cadastro/pagamentos/:id', AddPagamentosController)
export default routes
