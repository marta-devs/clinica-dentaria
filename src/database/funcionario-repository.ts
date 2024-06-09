import { prisma } from './connection'

export async function AddFuncionarioRepository(
  nome: string,
  email: string,
  telefone: string,
  senha: string,
  cargo : string
) {
  const funcionario = await prisma.funcionario.create({
    data: {
      nome,
      email,
      telefone, Usuario:{
        create:{
          login:email,
          cargo:cargo,
          senha:senha
        }
      }
    },
  })

  return funcionario
}

export async function FindFuncionarioByIDRepository(id:number) {
  const funcionario = await prisma.funcionario.findUnique({
    where: { id },
    include:{
      Usuario: true
    }
  })
  return funcionario
}

export async function DeleteFuncionarioRepository(id:number) {
  await prisma.funcionario.delete({ where: { id} })
}

export async function UpdateFuncionarioRepository(
  id: number,
  nome: string,
  telefone: string,
  email: string,
  senha: string
) {
  const funcionario = await prisma.funcionario.update({
    where: {
      id,
    },
    data: {
      nome,
      email,
      telefone,
    },
  })
  return funcionario
}

export async function FindRecepionistabyCargo(cargo:string) {
  const recepionista = await prisma.funcionario.findMany({
   
   where:{
     Usuario:{
      every:{
        cargo
      }
     }
    }
  })
  return recepionista
}


export async function findRecepcionistaByIdRepository(id:number) {

 const recepcionista= await prisma.funcionario.findFirst({
    include:{
      Usuario:true
    },where:{
      id
    }
  })

  return recepcionista
  
}