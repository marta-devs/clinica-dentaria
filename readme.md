# Clinica Dentária - API

## funcionalidades
- [x] login, metodo:POST e url: localhost:3333/login
- [x] buscar dentista por id, metodo:GET, para ser implementado assim url: localhost:3333/dentistas/${id_dentista}
- [x] buscar dentistas por nome metodo:GET, para ser implementado assim url: localhost:3333/dentistas?nome=${nome}
- [x] buscar todos dentistas metodo:GET, para ser implementado assim url: localhost:3333/dentistas/todos
- [] signup

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