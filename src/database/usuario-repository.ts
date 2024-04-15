import { type Usuario } from '@prisma/client'
import { prisma } from './connection'

export async function loadByEmail(
  email: string,
  nome: string
): Promise<Usuario | null> {
  const usuario = await prisma.usuario.findFirst({
    where: {
      paciente: {
        OR: [
          {
            email,
          },
          {
            nome,
          },
        ],
      },
    },
  })

  return usuario
}
