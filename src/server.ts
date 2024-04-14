import express from 'express'
import loginRoutes from './routes/login-routes'
import dentistaRoutes from './routes/dentista-routes'
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(loginRoutes)
app.use(dentistaRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
