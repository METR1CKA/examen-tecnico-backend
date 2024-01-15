import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class ValidatorException {
  private NOT_FOUND = 404
  private BAD_REQUEST = 400
  private EXISTS = 'exists'
  private DEVELOPMENT = 'development'

  constructor({ response }: HttpContextContract, Err: any) {
    const { messages: { errors: [error] } } = Err

    const { message, field, rule } = error

    if (Env.get('NODE_ENV') == this.DEVELOPMENT) {
      console.error(error)
    }

    response
      .status(
        rule == this.EXISTS ? this.NOT_FOUND : this.BAD_REQUEST
      )
      .json({
        status: 'Error',
        message,
        data: {
          field,
          rule,
        }
      })
  }
}