import { findDentistaById } from 'controller/find-dentista-by-id-controller'
import { findDentistasByNome } from '../controller/find-dentistas-by-nome-controller'
import { Router } from 'express'
import { findDentistasAllController } from 'controller/find-dentista-all-controller'

const routes = Router()

routes.get('/dentistas/', findDentistasByNome)
routes.get('/dentistas/todos', findDentistasAllController)
routes.get('/dentistas/:dentistaId', findDentistaById)

export default routes
