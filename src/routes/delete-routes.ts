import { deleteFuncionarioController } from 'controller/funcionario-controller/delete-funcionario-controller'
import { DeleteFuncionarioRepository } from 'database/funcionario-repository'
import express from 'express'

const routes = express.Router()

routes.delete('/deletar/funcionario/:id', deleteFuncionarioController)

export default routes
