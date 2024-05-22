import { updateFuncionarioController } from 'controller/funcionario-controller/update-funcionario-controller'
import express from 'express'

const routes = express.Router()

routes.put('/actualizar/funcionario/:id', updateFuncionarioController)

export default routes
