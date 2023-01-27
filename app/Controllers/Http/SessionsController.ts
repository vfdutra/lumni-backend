import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class SessionsController {
  public async store ({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const { token }= await auth.use('api').attempt(email, password, {
      expiresIn: '2hours',
    })

    return response.created({ user: auth.use('api').user, token})
  }

  public async destroy ({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.ok({'message': 'Logout successfully'})
  }

  public async googleRedirect ({ ally }: HttpContextContract) {
    await ally.use('google').redirect()
  }
  

  public async googleCallback({ ally, response }: HttpContextContract) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      return 'Access was denied'
    } else {
      const user = await google.user()

      return response.ok({user})
      
      const userExists = await User.findBy('email', user.email)
      if (userExists) {
        return userExists
      }
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: user.token,
      })
      return newUser
    }
  }
}
 