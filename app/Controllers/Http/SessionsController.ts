import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class SessionsController {
  public async create ({ view }: HttpContextContract) {
    return view.render('sessions/create')  
  }
  
  public async store ({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findByOrFail('email', email)

    if (!(await Hash.verify(user.password, password))) {
    return response.unauthorized('Invalid credentials')
    }
    const { token } = await auth.use('api').generate(user, {
      expiresIn: '2 hours'
    })

    return response.created({ user, token })
  }

  public async destroy ({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.ok({'message': 'Logout successfully'})
  }
}
 