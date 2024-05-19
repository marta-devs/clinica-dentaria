import { findTiposDeConsultaAllController } from '../controller/tipo-consulta-controller/find-tipo-consulta-all-controller'
import { addTipoConsultaController } from '../controller/tipo-consulta-controller/add-tipo-consulta-controller'
import { Router } from 'express'

const routes = Router()

routes.get('/tiposConsulta/todos', findTiposDeConsultaAllController)
routes.post('/tiposConsulta', addTipoConsultaController)

export default routes
