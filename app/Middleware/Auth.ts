import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthMiddleware {
  /**
   * Handle request
   */
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    /**
     * Uses the user defined guards or the default guard mentioned in
     * the config file
     */

    const is_login = await auth.use('api').check()

    if (!is_login) {
      const { isAuthenticated } = auth.use('api')

      return response.unauthorized({
        status: 'Error',
        message: 'No autorizado',
        data: {
          isAuthenticated,
        }
      })
    }

    await next()
  }
}
