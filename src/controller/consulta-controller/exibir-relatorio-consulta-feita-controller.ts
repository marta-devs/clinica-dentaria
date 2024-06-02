import fs from 'node:fs'
import { faker } from '@faker-js/faker';

import { imprimir } from "config/pdf-make";
import { Request, Response } from "express";
import { TDocumentDefinitions, TableCell } from "pdfmake/interfaces";
import { text } from 'stream/consumers';
import { findConsultaByIdRepository } from 'database/consulta-repository';
import { logotipo } from 'report/logotipo';
import moment from 'moment';


const calculoDeIdade = (data: string = ''): number => {
  const data_nas = new Date(data).getFullYear()
  const hoje = new Date().getFullYear()

  return hoje - data_nas
}


export async function exibirRelatorioConsultaFeitaController(request: Request, response: Response) {

  try {
    const consultaId = Number(request.params.consultaId)

    const consulta = await findConsultaByIdRepository(consultaId)

    if (!consulta) {
      response.send("Consulta não existe no banco de dados!")
    }

    const nomeCompleto = consulta?.paciente.nome.concat(' ', consulta.paciente.sobreNome)
    const idade = calculoDeIdade(consulta?.paciente.data_nasc)

    const estruturaDoRelatorio: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          image: `${logotipo}`,
          width: 120,
          style: "logo"
        },
        {
          columns: [
            { text: "RELATÓRIO DE CONSULTA", style: "titulo" },
            {
              text:
                [
                  { text: "Data: ", bold: true },
                  `${moment(new Date().toISOString(), "MM/DD/YYYY")}`,
                ], style: "data"
            },
          ], style: "header"
        },
        {
          style: "tableContainer",
          table: {
            widths: [250, 250],
            heights: [30, 50, 50, 50],
            body: [
              [
                { text: "Dados Pessoais", style: "tableHeader", colSpan: 2 },
                {}
              ],
              [
                {
                  style: "tableColumn",
                  text: [
                    { text: "Nome\n\n", bold: true },
                    { text: `${nomeCompleto}` }
                  ]
                },
                {
                  style: "tableColumn",
                  text: [
                    { text: "Idade\n\n", bold: true },
                    { text: `${idade}` }
                  ]
                }
              ],
              [
                {
                  style: "tableColumn",
                  text: [
                    { text: "Nacionalidade\n\n", bold: true },
                    { text: `${consulta?.paciente.nacionalidade}` }
                  ]
                },
                {
                  style: "tableColumn",
                  text: [
                    { text: "Endereco\n\n", bold: true },
                    { text: `${consulta?.paciente.endereco}` }
                  ]
                }
              ],
              [
                {
                  style: "tableColumn",
                  text: [
                    { text: "Email\n\n", bold: true },
                    { text: `${consulta?.paciente.email}` }
                  ]
                },
                {
                  style: "tableColumn",
                  text: [
                    { text: "Telefone\n\n", bold: true },
                    { text: `${consulta?.paciente.telefone}` }
                  ]
                }
              ]
            ]
          },
          layout: {
            hLineColor: '#E2E8F0',
            vLineColor: '#E2E8F0'
          }
        },
        {
          style: "tableContainer",
          table: {
            widths: [250, 250],
            heights: [30, 50, 50, 50],
            body: [
              [
                { text: "Dados da Consulta", style: "tableHeader", colSpan: 2 },
                {}
              ],
              [
                {
                  style: "tableColumn",
                  text: [
                    { text: "Nome do Dentista\n\n", bold: true },
                    { text: `${consulta?.dentista.nome}` }
                  ]
                },
                {
                  style: "tableColumn",
                  text: [
                    { text: "Serviço\n\n", bold: true },
                    { text: `${consulta?.tipo_consulta.tipo_consulta}` }
                  ]
                }
              ],
              [
                {
                  style: "tableColumn",
                  text: [
                    { text: "Data de Consulta\n\n", bold: true },
                    { text: `${consulta?.data_consulta}` }
                  ]
                },
                {
                  style: "tableColumn",
                  text: [
                    { text: "Hora de Consulta\n\n", bold: true },
                    { text: `${consulta?.hora_consulta}` }
                  ]
                }
              ],
              [
                {
                  style: "tableColumn",
                  text: [
                    { text: "Preço\n\n", bold: true },
                    { text: `${consulta?.tipo_consulta.preco} kz` }
                  ]
                },
                {
                  style: "tableColumn",
                  text: [
                    { text: "Data de Criação\n\n", bold: true },
                    { text: `${consulta?.data_criacao}` }
                  ]
                }
              ]
            ]
          },
          layout: {
            hLineColor: '#E2E8F0',
            vLineColor: '#E2E8F0'
          }
        },
        {
          style: "assignContainer",
          table: {
            heights: [64],
            widths: [250],
            body: [
              [
                {
                  style: "assign",
                  border: [false, true, false, false],
                  text: "Assinatura do Medico"
                }
              ]
            ]
          }
        },
        {
          style: "footerContainer",
          columns: [
            {
              text: [
                { text: "Email: ", bold: true },
                { text: "anyemail@gmail.com" }
              ]
            },
            {
              text: [
                { text: "Contacto: ", bold: true },
                { text: "+244 999999999" }
              ],
              style: "footerRight"
            }
          ]
        }

      ],
      styles: {
        logo: {
          marginLeft: 385,
          marginBottom: 50
        },
        header: {
          marginLeft: 30,
          marginBottom: 24,
          alignment: "center"
        },
        titulo: {
          fontSize: 15,
          bold: true,
          alignment: "left"
        },
        data: {
          marginLeft: 94,
          fontSize: 13
        },
        tableContainer: {
          fontSize: 12,
          marginBottom: 30,
        },
        tableHeader: {
          fillColor: "#E2E8F0",
          bold: true,
          fontSize: 14,
          marginTop: 10,
          marginLeft: 10
        },
        tableColumn: {
          marginTop: 4,
          marginLeft: 10
        },
        assignContainer: {
          marginTop: 32,
          marginLeft: 140
        },
        assign: {
          fontSize: 14,
          marginTop: 18,
          bold: true,
          alignment: "center"
        },
        footerContainer: {
          marginTop: 26,
          fontSize: 10
        },
        footerRight: {
          marginLeft: 120,
        }
      }
    }

    const relatorioPdf = imprimir.createPdfKitDocument(estruturaDoRelatorio)

    relatorioPdf.pipe(fs.createWriteStream('Relatorio.pdf'))

    const chunks: any[] = []

    relatorioPdf.on("data", (chunk) => {
      chunks.push(chunk)
    })

    relatorioPdf.end()

    relatorioPdf.on("end", () => {
      const resultado = Buffer.concat(chunks)
      response.end(resultado)
    })

  } catch (error) {
    return response.send("Ocorreu um erro interno!")
  }


}