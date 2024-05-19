import { addConsultaController } from 'controller/consulta-controller/add-consulta-controller'
import { cancelarConsultaController } from 'controller/consulta-controller/cancelar-consulta-controller'
import { findConsultaByEspecialistaOrDataController } from 'controller/consulta-controller/find-consulta-by-especialista-or-data-controller'
import { findConsultaByUsuarioIdController } from 'controller/consulta-controller/find-consulta-by-usuarioid-controller'
import { findHorariosLivresController } from 'controller/consulta-controller/find-horarios-livres-controller'
import { reagendarConsultaController } from 'controller/consulta-controller/reagendar-consulta-controller'
import { Router } from 'express'

const routes = Router()

routes.post('/consulta', addConsultaController)
routes.get('/consulta/:usuario_id/consultas', findConsultaByUsuarioIdController)
routes.post('/consulta/reagendar', reagendarConsultaController)
routes.get('/consulta/:dentista_id/horas', findHorariosLivresController)
routes.get('/consulta/:consulta_id/cancelar', cancelarConsultaController)
routes.get('/consulta/consultas', findConsultaByEspecialistaOrDataController)

export default routes
