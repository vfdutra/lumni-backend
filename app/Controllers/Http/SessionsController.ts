import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

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
  

  public async googleCallback({ ally }: HttpContextContract) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      return 'Access was denied'
    } else {
      const user = await google.user()

      const userExists = await User.findBy('email', user.email)
     if (userExists) {
        return userExists
      }

      const password = await Hash.make(user.email || "")

      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password 
      })
      return newUser
    }
  }
}
 