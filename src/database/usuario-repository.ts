import { prisma } from './connection'

export async function loadByEmail(email: string) {
  const usuario = await prisma.usuario.findFirst({
    where: {
      login: email
    },
  })

  return usuario
}

export async function findPacienteByUsuarioId(usuarioId: string) {
  const usuario = await prisma.usuario.findUnique({

    include: {
      paciente: true
    },

    where: {
      id: usuarioId,
    },
  })

  return usuario
}

