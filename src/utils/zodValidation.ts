function convertZodErrorInMessage(isValido: any): string {
  return JSON.parse(isValido?.error.toString())[0].message
}

export function zodValidation(schema: any, data: any) {
  const isValido = schema.safeParse(data)

  if (!isValido.success) {
    const messageError = convertZodErrorInMessage(isValido)
    return messageError
  }

  return null
}
