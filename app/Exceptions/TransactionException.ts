import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class TransactionException {
  constructor({ response }: HttpContextContract, Err: any) {
    if (Env.get('NODE_ENV') == 'development') {
      console.error(Err)
    }

    response.badRequest({
      status: 'Error',
      message: 'Ocurrio un error',
      data: null,
    })
  }
}