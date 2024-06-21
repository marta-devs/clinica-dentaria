import { reagendarConsultaController } from 'controller/consulta-controller/reagendar-consulta-controller'
import { updateFuncionarioController } from 'controller/funcionario-controller/update-funcionario-controller'
import { UpdatePacienteController } from 'controller/paciente-controller/update-paciente-controller'
import express from 'express'

const routes = express.Router()

routes.put('/actualizar/funcionario/:id', updateFuncionarioController)
routes.put('/actualizar/paciente/:id',UpdatePacienteController)
routes.put('/actualizar/consulta',reagendarConsultaController)

export default routes
