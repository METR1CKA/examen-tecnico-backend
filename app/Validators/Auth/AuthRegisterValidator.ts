import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthRegisterValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(100),
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email'
      })
    ]),
    username: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(75)
    ]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(50)
    ]),
  })

  public messages: CustomMessages = {
    required: `El campo '{{ field }}' es requerido`,
    email: 'Formato de email no valido',
    unique: 'Email ya registrado',
    maxLength: `El campo '{{ field }}' debe de contener como maximo {{ options.maxLength }} caracteres`,
    '*': (field, rule) => `El campo '${field}' debe ser de tipo '${rule}'`
  }
}
