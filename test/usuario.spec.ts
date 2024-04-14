import { prisma } from 'database/connection'

describe('Usuario Test', () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.usuario.deleteMany(),
      prisma.paciente.deleteMany(),
    ])
  })
})
