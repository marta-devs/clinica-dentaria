import { addConsultaController } from 'controller/consulta-controller/add-consulta-controller'
import { cancelarConsultaController } from 'controller/consulta-controller/cancelar-consulta-controller'
import { findConsultaByEspecialistaOrDataController } from 'controller/consulta-controller/find-consultas-by-especialista-or-data-controller'
import { findConsultaByUsuarioIdController } from 'controller/consulta-controller/find-consulta-by-usuarioid-controller'
import { findHorariosLivresController } from 'controller/consulta-controller/find-horarios-livres-controller'
import { reagendarConsultaController } from 'controller/consulta-controller/reagendar-consulta-controller'
import { Router } from 'express'
import { findConsultaByIdController } from 'controller/consulta-controller/find-consulta-by-id-controller'
import {FindRecepcionistaByIdController, findFuncionarioController, findRecepcionistaController } from 'controller/funcionario-controller/find-funcionario-controller'
import { findConsultasFinalizadasController } from 'controller/consulta-controller/find-consultas-finzalizada-controller'
import { exibirRelatorioConsultaFeitaController } from 'controller/consulta-controller/exibir-relatorio-consulta-feita-controller'
import { atualizarStatusConsultaController } from 'controller/consulta-controller/atualizar-status-consulta-controller'
import { findAllConsultsController } from 'controller/consulta-controller/find-all-consult-controller'
import { FindPagamentoByPacientNameController } from 'controller/pagamentos-controller/Find-pagamento-by-pacient-name-controller'
import { FindPagamentoByDataConsultController } from 'controller/pagamentos-controller/Find-pagamento-by-consult-data'
import { FindAllPagamentoConstroller } from 'controller/pagamentos-controller/Find-all-pagamentos'
import { findPagamentoByStatus } from 'controller/pagamentos-controller/Find-pagamentos-by-status'

const routes = Router()

routes.get('/consulta/:consultaId/relatorio', exibirRelatorioConsultaFeitaController)
routes.post('/consulta', addConsultaController)
routes.get('/consulta/:usuario_id/consultas', findConsultaByUsuarioIdController)
routes.post('/consulta/reagendar', reagendarConsultaController)
routes.get('/consulta/:dentista_id/horas', findHorariosLivresController)
routes.get('/consulta/:consulta_id/cancelar', cancelarConsultaController)
routes.get('/consulta/consultas', findConsultaByEspecialistaOrDataController)
routes.get('/consulta/:consulta_id', findConsultaByIdController)
routes.get('/consulta/pagamento/:nome', FindPagamentoByPacientNameController)
routes.get('/consulta/pagamentos/:num', FindAllPagamentoConstroller)
routes.get('/consulta/pagamentos/status/:status', findPagamentoByStatus)
routes.get('/consulta/pagamento/dataConsulta/:data', FindPagamentoByDataConsultController)
routes.get('/consulta/funcionario/:id', findFuncionarioController)
routes.get('/consulta/recepcionistas/:cargo',findRecepcionistaController)
routes.get('/consulta/recepcionista/:id',FindRecepcionistaByIdController)
routes.get('/consulta/finalizadas/:status', findConsultasFinalizadasController)
routes.get('/consulta/todas/:id',findAllConsultsController)
routes.patch('/consulta/:consultaId', atualizarStatusConsultaController)

export default routes
