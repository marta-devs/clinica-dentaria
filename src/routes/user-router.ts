import Express from 'express'
import { FindUserByIdController } from '../controller/usuario-controller/find-user-by-id'
const route = Express.Router()

route.get('/consultar/usuario/:id', FindUserByIdController)


export default route
