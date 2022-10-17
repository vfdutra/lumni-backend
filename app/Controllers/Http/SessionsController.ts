import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async create ({ view }: HttpContextContract) {
    return view.render('sessions/create')  
  }
  
  public async store ({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const { token }= await auth.use('api').attempt(email, password, {
      expiresIn: '2hours',
    })

    return response.created({ user: auth.use('api').user, token})
  }

  public async destroy ({ auth, response }: HttpContextContract) {
    await auth.use('api').logout()
    return response.ok({'message': 'Logout successfully'})
  }
}
 