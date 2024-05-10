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
  
    include:{
      paciente:true
    },

    where: {
      id: usuarioId,
    },
  })

  return usuario
}

export async function addCadastroSenhaUsuarioRepository (senha:string, pacienteId:number) {



  const usuario = await prisma.usuario.create({
    data:{
      senha,
      cargo: "paciente",
      pacienteId
    }
  })
  
 return usuario
}