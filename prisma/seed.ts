import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

const tiposDeConsulta = [
  { tipo_consulta: 'Limpeza e profilaxia', preco: 8000, desconto: 0 },
  { tipo_consulta: 'Exames e radiografias:', preco: 15000, desconto: 0 },
  { tipo_consulta: 'Restaurações estéticas', preco: 8000, desconto: 0 },
  { tipo_consulta: 'Cirurgia oral', preco: 8000, desconto: 0 },
  { tipo_consulta: 'implantes dentários', preco: 8000, desconto: 0 },
  { tipo_consulta: 'Odontopediatria', preco: 8000, desconto: 0 },
  { tipo_consulta: 'Obturações', preco: 8000, desconto: 0 },
]

// primeiro valor equivale: 8horas primeiro turno, segundo valor equivale: 15horas segundo turno.
const horaExpediente = [480, 900]
const CARGAHORARIA = 420 // 7 HORAS

const createFakePacientes = (): void => Array.from({ length: 6 }).forEach(async (_, index) => {
  await prisma.paciente.create({
    data: {
      nome: faker.internet.displayName(),
      sobreNome: faker.internet.userName(),
      data_nasc: faker.date.past({ years: 10 }).toString(),
      sexo: index % 2 === 0 ? 'Femenino' : 'Masculino',
      nacionalidade: faker.location.country(),
      telefone: faker.phone.number(),
      email: faker.internet.email(),
      endereco: faker.location.city()
    }
  })

  await prisma.usuario.create({
    data: {
      cargo: 'Paciente',
      senha: faker.internet.password(),
      pacienteId: index + 1
    }
  })
})

const createFakeUsuarios = (): void => Array.from({ length: 5 }).forEach(async (_, index) => {
  await prisma.usuario.create({
    data: {
      cargo: 'Paciente',
      senha: faker.internet.password(),
      pacienteId: index + 1
    }
  })
  console.log(index)
})

const createFakeDentistas = (): void => Array.from({ length: 7 }).forEach(async (_, index) => {
  await prisma.dentista.create({
    data: {
      nome: faker.internet.userName(),
      especialidade: 'dentista-senior',
      NCarteira: faker.string.numeric(13),
      status: index % 2 === 0 ? 'ativo' : 'desativo',
      semanaAtendimento: 'segunda, terça, quarta, quinta, sexta',
      horaStart: horaExpediente[index % 2],
      horaEnd: horaExpediente[index % 2] * CARGAHORARIA,
    }
  })
})

async function main() {
  await Promise.all([
    createFakePacientes(),
    createFakeDentistas(),
  ])

  await prisma.tipo_consulta.createMany({
    data: tiposDeConsulta
  })

}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })