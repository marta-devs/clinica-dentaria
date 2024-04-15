import { loadByEmail } from 'database/usuario-repository'
import { type Request, type Response } from 'express'
import { convertZodErrorInMessage } from 'utils/convert-zod-error-in-message'
import z from 'zod'

const nomeAndSenhaSchema = z.object({
  nome: z
    .string({
      required_error: 'Parametro nome não passado',
    })
    .min(1, { message: 'Nome vazio' }),
  senha: z
    .string({
      required_error: 'Parametro senha não passado',
    })
    .min(1, { message: 'senha vazia' }),
})

const EmailAndSenhaSchema = z.object({
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

const loginSchema = z.union([nomeAndSenhaSchema, EmailAndSenhaSchema])

export async function loginController(request: Request, response: Response) {
  try {
    const isValido = loginSchema.safeParse(request.body)

    if (!isValido.success) {
      const messageError = convertZodErrorInMessage(isValido)
      return response.status(403).json(messageError)
    }

    const usuario = request.body

    const newUsuario = await loadByEmail(usuario.email, usuario.nome)

    if (!newUsuario) {
      return response
        .status(401)
        .json({ mensagem: 'usuario não existe no banco de dados' })
    }

    if (usuario.senha !== newUsuario.senha) {
      return response.json({ mensagem: 'Senha errada' })
    }
    return response.json({ id: newUsuario.id })
  } catch (error) {
    return response.status(500).json(error)
  }
}
