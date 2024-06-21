import { prisma } from 'database/connection'
import { FindConsultasFinalizadasRepository } from 'database/consulta-repository'
import { Request, Response } from 'express'
import moment from 'moment'
import nodemailer from 'nodemailer'


export async function findConsultasFinalizadasController(request:Request, response:Response) {
  const {status} = request.params
 
  const consultasFinalizadas = await FindConsultasFinalizadasRepository(status)
 

  return response.json(consultasFinalizadas)

}

