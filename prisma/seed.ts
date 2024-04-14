import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

const createFakePacientes = Array.from({ length: 6 }).map((_, index) => {
  return {
    nome: faker.internet.userName(),
    data_nasc: faker.date.past({ years: 10 }).toString(),
    sexo: index % 2 === 0 ? 'Femenino' : 'Masculino',
    telefone: faker.phone.number(),
    email: faker.internet.email(),
    endereco: faker.location.city()
  }
})

const createFakeUsuarios = Array.from({ length: 5 }).map((_, index) => {
  return {
    id: faker.internet.userName(),
    cargo: 'Paciente',
    senha: faker.internet.password(),
    pacienteId: index + 1
  }
})

const createFakeDentistas = Array.from({ length: 7 }).map((_, index) => {
  return {
    nome: faker.internet.userName(),
    especialidade: 'dentista-senior',
    NCarteira: faker.string.numeric(13),
    status: index % 2 === 0 ? 'ativo' : 'desativo',
    semanaAtendimento: 'segunda, terça, quarta, quinta, sexta',
    horaStart: Number(faker.string.numeric({ length: { min: 2, max: 3 } })),
    horaEnd: Number(faker.string.numeric({ length: { min: 4, max: 5 } })),
  }
})

async function main() {
  await Promise.all([
    createFakePacientes.forEach(async paciente => {
      await prisma.paciente.create({
        data: { ...paciente }
      })
    }),
    createFakeDentistas.forEach(async dentista => {
      await prisma.dentista.create({
        data: { ...dentista }
      })
    }),
    createFakeUsuarios.forEach(async usuario => {
      await prisma.usuario.create({
        data: { ...usuario }
      })
    })
  ])

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