![](/public/clinica-dentologica.png)

<p align='center'>🚧 Sistema de Gestão e marcação de Consulta (Clínica Dentaria) 🚀 Em construção... 🚧</p>

## Descrição do projeto

## Indices

## Rotas

- [x] POST: localhost:3333/login
- [x] Post: signup

### Rotas do dentistas
- [x] GET: localhost:3333/dentistas/${id_dentista}
- [x] GET: localhost:3333/dentistas?filtro=${filtro}&page=${page}&limit=${limit}
- [x] GET: localhost:3333/dentistas/todos?page=${page}&limit=${limit}
- [x] PUT: localhost:3333/dentistas/${id_dentista}
- [X] DELETE: localhost:3333/dentistas/${id_dentista}

### Rotas do tipo de consulta ou serviço
- [x] GET: localhost:3333/tiposConsulta/todos?filtro=${filtro}&page=${page}&limit=${limit}
- [x] POST: localhost:3333/tiposConsulta
- [X] PUT: localhost:3333/tiposConsulta/:${tiposConsulta_id}
- [x] DELETE: localhost:3333/tiposConsulta/:tiposConsulta_id

### Rotas de consultas

- [x] POST: localhost:3333/consulta
- [x] POST: localhost:3333/consulta/reagendar
- [x] GET: localhost:3333/consulta/dentista_id/horas?data_escolhido=${data}
- [x] GET: localhost:3333/consulta/:consulta_id/cancelar
- [x] GET: localhost:3333/consulta/consultas?filtro=${filtro}&page=${page}&limit=${limit}
- [x] GET: localhost.3333/consulta/:consulta_id

### Rotas de consultas
- [x] GET: localhost:3333/paciente/:${usuarioId}

### 📋 Pré-requisitos

> Para se ter esse projeto a funcionar deve se ter o [Nodejs](https://nodejs.org/pt-br/download) na sua maquina que vai permitir com que projeto rode na sua maquina, [Git](https://git-scm.com/downloads), conseguir clonar o projeto na sua máquina, [Vscode](https://code.visualstudio.com/download), extensions do prisma para editar para facilitar na escrita e correção automatica, extensão do eslint e prettier.

### 🔧 instalação do projeto

```bash
 # Primeiro clonar o projeto
    git clone <URL>

 # Acender a pasta
    cd clinica-dentista

 # instalar as dependencias do projeto
    npm install

  # instalar as dependencias do projeto
    npx prisma migrate dev

 # Rodar aplicativo
    npm run dev

 # Depois scanner o QRcode ou uri para ver o projeto a funcionar
```
### para fazer o push
  ```bash
 # Em caso que branch principal senha faça os passos:
 # passo 1
    git branch main -M

 # Passo 2
    git remote add o <url>

 # Depois dos passos é só enviar
    git push o main

```
## Contribuidores

## 📄 Licença

Este projeto está sob a licença MIT [licença](#).

## 🎁 Expressões de gratidão

Convido Todas a gente que gostou desse projeto tanto nos aspeto de tecnologia ou a ideias do projeto para contribuir esse projeto afim de dar passo maior.
