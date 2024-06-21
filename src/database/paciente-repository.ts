import { prisma } from './connection'

export async function addPacienteRepository(
  nome: string,
  sobreNome: string,
  dataNasc: string,
  sexo: string,
  nacionalidade: string,
  telefone: string,
  email: string,
  endereco: string,
  senha: string
) {
  const paciente = await prisma.paciente.create({
    data: {
      nome,
      sobreNome,
      data_nasc: dataNasc,
      sexo,
      nacionalidade,
      telefone,
      email,
      endereco,
      Usuario: {
        create: {
          login: email,
          cargo: 'PACIENTE',
          senha: senha,
        },
      },
    },
  })

  return paciente
}

export async function findEmailAndTelefonePaciente(
  email: string,
  telefone: string
) {
  const paciente = await prisma.paciente.findFirst({
    where: {
      OR: [{ email: email }, { telefone: telefone }],
    },
  })
  return paciente
}

export async function findPacienteByIdRepository(id: number) {
  const paciente = await prisma.paciente.findFirst({
    where: {
      id,
    },
    select: {
      nome: true,
      sobreNome: true,
      data_nasc: true,
      email: true,
      nacionalidade: true,
      sexo: true,
      telefone: true,
      endereco: true,
    },
  })

  return paciente
}

export async function findPacienteAllRepository() {
  return await prisma.dentista.findMany({})
}

export async function UpdatePacienteRepository(
  id:number,
  nome: string,
  sobreNome: string,
  dataNasc: string,
  sexo: string,
  nacionalidade: string,
  telefone: string,
  email: string,
  endereco: string,
  senha: string,
  usuarioId:string
) {
  const paciente = await prisma.paciente.update({
    where:{
      id:id
    },data: {
      nome,
      sobreNome,
      data_nasc: dataNasc,
      sexo,
      nacionalidade,
      telefone,
      email,
      endereco,
      Usuario: {
         update:{
          where:{
            id:usuarioId
          }
          ,data:{
            login:email,
            cargo:'PACIENTE',
            senha:senha
          }
         }
      },
    },
  })

  return paciente
}
