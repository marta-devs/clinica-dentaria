import { addConsultaController } from 'controller/consulta-controller/add-consulta-controller'
import { reagendarConsultaController } from 'controller/consulta-controller/reagendar-consulta-controller'
import { Router } from 'express'

const routes = Router()

routes.post('/consulta', addConsultaController)
routes.post('/consulta/reagendar', reagendarConsultaController)

export default routes
