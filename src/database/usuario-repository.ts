import { prisma } from './connection'

export async function loadByEmail(email: string, nome: string) {
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

export async function findPacienteByUsuarioId(usuarioId: string) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: usuarioId,
    },
  })

  return usuario
}

export async function addCadastroSenhaUsuarioRepository (senha:string, cargo:string, pacienteId:number) {



  const usuario = await prisma.usuario.create({
    data:{
      senha,
      cargo,
      pacienteId:1
    }
  })
  
 return usuario
}