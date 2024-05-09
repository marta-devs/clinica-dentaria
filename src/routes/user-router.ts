import Express from 'express'
import { FindUserByIdController } from '../controller/usuario-controller/find-user-by-id'
import { addCadastroSenhaUsuarioController } from '../controller/usuario-controller/add-user-password'
const route = Express.Router()

route.get('/consultar/usuario/:id', FindUserByIdController)
route.post('/cadastro/usuario',addCadastroSenhaUsuarioController)

export default route
