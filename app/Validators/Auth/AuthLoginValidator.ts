import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthLoginValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(100),
      rules.email(),
    ]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(50)
    ]),
  })

  public messages: CustomMessages = {
    required: `El campo '{{ field }}' es requerido`,
    email: 'Formato de email no valido',
    maxLength: `El campo '{{ field }}' debe de contener como maximo {{ options.maxLength }} caracteres`,
    '*': (field, rule) => `El campo '${field}' debe ser de tipo '${rule}'`
  }
}
