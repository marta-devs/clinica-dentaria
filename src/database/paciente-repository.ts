import { type Paciente } from '@prisma/client'
import { prisma } from './connection'

export async function addPacienteRepository(
  nome: string,
  sobreNome: string,
  dataNasc: string,
  sexo: string,
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
      telefone,
      email,
      endereco,
    },
  })

  return paciente
}
