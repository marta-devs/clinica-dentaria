import { loginController } from 'controller/login-controller'
import { Router } from 'express'

const routes = Router()

routes.post('/login', loginController)

export default routes
