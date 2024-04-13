import express, { type Request, type Response } from 'express'

const port = process.env.PORT
const app = express()

app.get('/', (req: Request, res: Response) => {
  return res.json({ mensagem: 'Olá, mundo!!' })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
