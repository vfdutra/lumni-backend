import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
  }
  
  public async register({ request, auth, response }: HttpContextContract) {
    const userSchema = schema.create({
        email: schema.string({ trim: true }, [
            rules.email(),
    })

  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }
}
