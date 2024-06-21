import { prisma } from "./connection";


export async function pagamentoRepository(valor:number,forma:string,status:string,id:number) {

  const pagemento =  await prisma.pagamentos.create({
    include:{
      consulta:true
    },data:{
      valor,
      formaPagamento:forma,
      status,
      consulta:{
        connect:{
          id
        }
      }
    }
  })
    return pagemento
}

export async function FindPagementoByPacientName(nome:string){

  
  const paciente = await prisma.pagamentos.findMany({
   include:{
    consulta:{
      include:{
        paciente:true,
        tipo_consulta:true
      }
    }
   },where:{
     consulta:{
      paciente:{
        nome:nome
      }
     }
   }
  })

  return paciente

}
export async function findPagamentoByConsultData(data:string) {
  const pagamento = await prisma.pagamentos.findMany({
   include:{
    consulta:{
      include:{
        paciente:true,
        tipo_consulta:true
      }
    }
   },where:{
      consulta:{
        data_consulta:data
      }
    }
  }) 
  return pagamento
}

export async function findAllPagamento(num:number){
 
  const pagamento = prisma.pagamentos.findMany({
    take:num,
    include:{
      consulta:{
        include:{
          paciente:true,
          dentista:true,
          tipo_consulta:true
          }
        }
      },orderBy:{
        data:'asc'
      }
    }
  )
  return pagamento
  
}

export async function findPagamentoByStatusRepository(status:string){
   const pagamento = await prisma.pagamentos.findMany({
    include:{
      consulta:{
        include:{
          paciente:true,
          dentista:true,
          tipo_consulta:true
          }
        }
      },orderBy:{
        data:'asc'
      },where:{
        status:status
      }

   })

   return pagamento
}