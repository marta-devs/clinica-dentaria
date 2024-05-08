import { addConsultaController } from 'controller/consulta-controller/add-consulta-controller'
import { findConsultaByUsuarioIdController } from 'controller/consulta-controller/find-consulta-by-usuarioid-controller'
import { findHorariosLivresController } from 'controller/consulta-controller/find-horarios-livres-controller'
import { reagendarConsultaController } from 'controller/consulta-controller/reagendar-consulta-controller'
import { Router } from 'express'

const routes = Router()

routes.post('/consulta', addConsultaController)
routes.get('/consulta/:usuario_id/consultas', findConsultaByUsuarioIdController)
routes.post('/consulta/reagendar', reagendarConsultaController)
routes.get('/consulta/:dentista_id/horas', findHorariosLivresController)

export default routes
