import { findDentistaById } from 'controller/find-dentista-by-id-controller'
import { Router } from 'express'

const routes = Router()

routes.get('/dentistas/:dentistaId', findDentistaById)

export default routes
