import { type Paciente } from '@prisma/client'
import { prisma } from './connection'

export async function addPacienteRepository(
  nome: string,
  sobreNome: string,
  dataNasc: string,
  sexo: string,
  nacionalidade: string,
  telefone: string,
  email: string,
  endereco: string
): Promise<Paciente | null> {
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
    },
  })

  return paciente
}

export async function findEmailAndTelefonePaciente(email: string, telefone: string) {

  const paciente = await prisma.paciente.findFirst({
    where: {
      OR: [
        { email: email },
        { telefone: telefone }
      ]
    }
  })
  return paciente
}