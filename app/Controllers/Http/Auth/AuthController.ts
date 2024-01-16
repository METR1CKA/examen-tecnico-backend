import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidatorException from 'App/Exceptions/ValidatorException'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import TransactionException from 'App/Exceptions/TransactionException'
import ApiToken from 'App/Models/ApiToken'
import AuthLoginValidator from 'App/Validators/Auth/AuthLoginValidator'
import AuthRegisterValidator from 'App/Validators/Auth/AuthRegisterValidator'

export default class AuthController {
  public async register(ctx: HttpContextContract) {
    const { request, response } = ctx

    try {
      await request.validate(AuthRegisterValidator)
    } catch (Err) {
      return new ValidatorException(ctx, Err)
    }

    const {
      email,
      username,
      password,
    } = request.body()

    const trx = await Database.transaction()

    try {
      await User.create({
        email,
        username,
        password,
      })

      await trx.commit()
    } catch (Err) {
      await trx.rollback()

      return new TransactionException(ctx, Err)
    }

    return response.ok({
      status: 'Success',
      message: 'Registro exitoso',
      data: null,
    })
  }

  public async login(ctx: HttpContextContract) {
    const { auth, request, response } = ctx

    try {
      await request.validate(AuthLoginValidator)
    } catch (Err) {
      return new ValidatorException(ctx, Err)
    }

    const { email, password } = request.body()

    try {
      await auth.use('api').verifyCredentials(email, password)
    } catch (error) {
      return response.badRequest({
        status: 'Error',
        message: 'Credenciales incorrectas',
        data: null
      })
    }

    const user = await User.findBy('email', email)

    if (!user) {
      return response.notFound({
        status: 'Error',
        message: 'Usuario no encontrado',
        data: null
      })
    }

    const {
      type,
      token,
      expiresAt
    } = await auth.use('api').attempt(email, password, {
      expiresIn: '1 year'
    })

    const expires = expiresAt
      ?.setZone('America/Mexico_City')
      ?.toFormat('yyyy-MM-dd HH:mm:ss')

    return response.ok({
      status: 'Éxito',
      message: 'Inicio de sesión éxitoso',
      data: {
        type,
        token,
        expiresAt: expires ?? null,
      }
    })
  }

  public async logout({ auth, request, response }: HttpContextContract) {
    const { id } = (
      auth.use('api').user
    ) as any

    await auth.use('api').revoke()

    const revokeAll = Boolean(
      request.input('revokeAll')
    )

    if (!revokeAll) {
      return response.ok({
        status: 'Éxito',
        message: 'Cierre de sesión éxitoso',
        data: null
      })
    }

    await ApiToken.query()
      .where({ user_id: id })
      .delete()

    const revoked = await ApiToken.query()
      .where({ user_id: id })

    return response.ok({
      status: 'Éxito',
      message: 'Sesiones cerradas éxitosamente',
      data: {
        tokensRevoked: revoked.length == 0,
      }
    })
  }

  public async me({ auth, response }: HttpContextContract) {
    const { id, email } = (
      auth.use('api').user
    ) as any

    const user = (
      await User.query()
        .where({ id, email })
        .first()
    ) as User

    return response.ok({
      status: 'Éxito',
      message: 'Datos del usuario actual',
      data: user
    })
  }
}
