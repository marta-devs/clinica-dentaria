import { findTiposDeConsultaAllController } from '../controller/tipo-consulta-controller/find-tipo-consulta-all-controller'
import { addTipoConsultaController } from '../controller/tipo-consulta-controller/add-tipo-consulta-controller'
import { Router } from 'express'
import { updateTipoConsultaController } from 'controller/tipo-consulta-controller/update-tipo-consulta-controller'
import { deleteTipoConsultaController } from 'controller/tipo-consulta-controller/delete-tipo-consulta-controller'

const routes = Router()

routes.get('/tiposConsulta/todos', findTiposDeConsultaAllController)
routes.post('/tiposConsulta', addTipoConsultaController)
routes.put('/tiposConsulta/:tiposConsulta_id', updateTipoConsultaController)
routes.delete('/tiposConsulta/:tiposConsulta_id', deleteTipoConsultaController)


export default routes
