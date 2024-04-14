import { loadByEmail } from 'database/usuario-repository'
import { type Request, type Response } from 'express'
import { convertZodErrorInMessage } from 'utils/convert-zod-error-in-message'
import z from 'zod'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Parametro email não passado',
    })
    .min(1, { message: 'email vazio' })
    .email({ message: 'email invalido' }),
  senha: z
    .string({
      required_error: 'Parametro senha não passado',
    })
    .min(1, { message: 'senha vazia' }),
})

export async function loginController(request: Request, response: Response) {
  try {
    const isValido = loginSchema.safeParse(request.body)

    if (!isValido.success) {
      const messageError = convertZodErrorInMessage(isValido)
      return response.status(403).json(messageError)
    }

    const { email, senha } = request.body

    const usuario = await loadByEmail(email)

    if (!usuario) {
      return response
        .status(401)
        .json({ mensagem: 'usuario não existe no banco de dados' })
    }

    if (senha !== usuario.senha)
      return response.json({ mensagem: 'Senha errada' })

    return response.json({ id: usuario.id })
  } catch (error) {
    return response.status(500).json(error)
  }
}
