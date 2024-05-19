import { findDentistaById } from 'controller/dentista-controller/find-dentista-by-id-controller'
import { findDentistasByNome } from '../controller/dentista-controller/find-dentistas-by-nome-controller'
import { findDentistasAllController } from 'controller/dentista-controller/find-dentista-all-controller'
import { Router } from 'express'
import { addDentistaController } from 'controller/dentista-controller/add-dentista-controller'
import { updateDentistaController } from 'controller/dentista-controller/update-dentista-controller'

const routes = Router()

routes.post('/dentistas', addDentistaController)
routes.get('/dentistas', findDentistasByNome)
routes.get('/dentistas/todos', findDentistasAllController)
routes.get('/dentistas/:dentistaId', findDentistaById)
routes.put('/dentistas/:dentistaId', updateDentistaController)

export default routes
