import { loadByEmail } from 'database/usuario-repository'
import { type Request, type Response } from 'express'
import { zodValidation } from 'utils/zodValidation'
import z from 'zod'

const nomeAndSenhaSchema = z.object({
  nome: z
    .string({
      required_error: 'Parametro nome não passado',
    })
    .min(1, { message: 'Parametro nome está vazio' }),
  senha: z
    .string({
      required_error: 'Parametro senha não passado',
    })
    .min(1, { message: 'Parametro senha está vazio' }),
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
    const validate = zodValidation(loginSchema, request.body)

    if (validate) {
      return response.status(403).json({ mensagem: validate })
    }

    const usuario = request.body

    const newUsuario = await loadByEmail(usuario.email)

    if (!newUsuario) {
      return response
        .status(401)
        .json({ mensagem: 'usuario não existe no banco de dados' })
    }

    if (usuario.senha !== newUsuario.senha) {
      return response.status(401).json({ mensagem: 'A senha está incorreta!' })
    }
    return response.json({ id: newUsuario.id, cargo: newUsuario.cargo })
  } catch (error) {
    return response.status(500).json(error)
  }
}
