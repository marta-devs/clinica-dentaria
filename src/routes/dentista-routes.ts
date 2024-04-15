import { findDentistaById } from 'controller/dentista-controller/find-dentista-by-id-controller'
import { findDentistasByNome } from '../controller/dentista-controller/find-dentistas-by-nome-controller'
import { findDentistasAllController } from 'controller/dentista-controller/find-dentista-all-controller'
import { Router } from 'express'

const routes = Router()

routes.get('/dentistas', findDentistasByNome)
routes.get('/dentistas/todos', findDentistasAllController)
routes.get('/dentistas/:dentistaId', findDentistaById)

export default routes
