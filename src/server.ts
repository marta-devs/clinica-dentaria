import express from 'express'
import loginRoutes from './routes/login-routes'
import dentistaRoutes from './routes/dentista-routes'
import tiposConsultaRoutes from './routes/tipo-consulta-routes'
import consultaRoutes from './routes/consulta-routes'
import userRouter from './routes/user-router'
import cors from 'cors'

const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

app.use(loginRoutes)
app.use(dentistaRoutes)
app.use(tiposConsultaRoutes)
app.use(consultaRoutes)
app.use(userRouter)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
