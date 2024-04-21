import { addConsultaController } from 'controller/consulta-controller/add-consulta-controller'
import { Router } from 'express'

const routes = Router()

routes.post('/consulta', addConsultaController)

export default routes
