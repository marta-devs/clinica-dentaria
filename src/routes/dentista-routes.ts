import { findDentistaById } from 'controller/find-dentista-by-id-controller'
import { findDentistasByNome } from '../controller/find-dentistas-by-nome'
import { Router } from 'express'

const routes = Router()

routes.get('/dentistas/:dentistaId', findDentistaById)
routes.get('/dentistas/', findDentistasByNome)

export default routes
