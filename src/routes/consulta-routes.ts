import { addConsultaController } from 'controller/consulta-controller/add-consulta-controller'
import { cancelarConsultaController } from 'controller/consulta-controller/cancelar-consulta-controller'
import { findConsultaByEspecialistaOrDataController } from 'controller/consulta-controller/find-consultas-by-especialista-or-data-controller'
import { findConsultaByUsuarioIdController } from 'controller/consulta-controller/find-consulta-by-usuarioid-controller'
import { findHorariosLivresController } from 'controller/consulta-controller/find-horarios-livres-controller'
import { reagendarConsultaController } from 'controller/consulta-controller/reagendar-consulta-controller'
import { Router } from 'express'
import { findConsultaByIdController } from 'controller/consulta-controller/find-consulta-by-id-controller'
import { findFuncionarioController } from 'controller/funcionario-controller/find-funcionario-controller'
import { findConsultasFinalizadasController } from 'controller/consulta-controller/find-consultas-finzalizada-controller'
import { exibirRelatorioConsultaFeitaController } from 'controller/consulta-controller/exibir-relatorio-consulta-feita-controller'
import { atualizarStatusConsultaController } from 'controller/consulta-controller/atualizar-status-consulta-controller'

const routes = Router()

routes.get('/consulta/:consultaId/relatorio', exibirRelatorioConsultaFeitaController)
routes.post('/consulta', addConsultaController)
routes.get('/consulta/:usuario_id/consultas', findConsultaByUsuarioIdController)
routes.post('/consulta/reagendar', reagendarConsultaController)
routes.get('/consulta/:dentista_id/horas', findHorariosLivresController)
routes.get('/consulta/:consulta_id/cancelar', cancelarConsultaController)
routes.get('/consulta/consultas', findConsultaByEspecialistaOrDataController)
routes.get('/consulta/:consulta_id', findConsultaByIdController)
routes.get('/consulta/funcionario/:id', findFuncionarioController)
routes.get('/consulta/finalizadas', findConsultasFinalizadasController)
routes.patch('/consulta/:consultaId', atualizarStatusConsultaController)

export default routes
