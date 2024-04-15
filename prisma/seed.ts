import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

const tiposDeConsulta = [
  { tipo_consulta: 'Limpeza e profilaxia', preco: 8000 },
  { tipo_consulta: 'Exames e radiografias:', preco: 15000 },
  { tipo_consulta: 'Restaurações estéticas', preco: 8000 },
  { tipo_consulta: 'Cirurgia oral', preco: 8000 },
  { tipo_consulta: 'implantes dentários', preco: 8000 },
  { tipo_consulta: 'Odontopediatria', preco: 8000 },
  { tipo_consulta: 'Obturações', preco: 8000 },
]

const createFakePacientes = Array.from({ length: 6 }).forEach(async (_, index) => {
  await prisma.paciente.create({
    data: {
      nome: faker.internet.displayName(),
      data_nasc: faker.date.past({ years: 10 }).toString(),
      sexo: index % 2 === 0 ? 'Femenino' : 'Masculino',
      telefone: faker.phone.number(),
      email: faker.internet.email(),
      endereco: faker.location.city()
    }
  })
})

const createFakeUsuarios = Array.from({ length: 5 }).forEach(async (_, index) => {
  await prisma.usuario.create({
    data: {
      cargo: 'Paciente',
      senha: faker.internet.password(),
      pacienteId: index + 1
    }
  })
})

const createFakeDentistas = Array.from({ length: 7 }).forEach(async (_, index) => {
  await prisma.dentista.create({
    data: {
      nome: faker.internet.userName(),
      especialidade: 'dentista-senior',
      NCarteira: faker.string.numeric(13),
      status: index % 2 === 0 ? 'ativo' : 'desativo',
      semanaAtendimento: 'segunda, terça, quarta, quinta, sexta',
      horaStart: Number(faker.string.numeric({ length: { min: 2, max: 3 } })),
      horaEnd: Number(faker.string.numeric({ length: { min: 4, max: 5 } })),
    }
  })
})

const createFakeTipoConsulta = tiposDeConsulta.forEach(async (tipoConsulta) => {
  await prisma.tipo_consulta.create({
    data: {
      ...tipoConsulta,
      desconto: 0
    }
  })
})

async function main() {
  await Promise.all([
    createFakePacientes,
    createFakeDentistas,
    createFakeUsuarios,
  ])

  await createFakeTipoConsulta

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