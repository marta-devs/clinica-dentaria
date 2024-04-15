import { findTiposDeConsultaAllController } from '../controller/find-tipo-consulta-all-controller'
import { Router } from 'express'

const routes = Router()

routes.get('/tiposConsulta/todos', findTiposDeConsultaAllController)

export default routes
