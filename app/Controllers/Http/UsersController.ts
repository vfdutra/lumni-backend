import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import UpdateUser from 'App/Validators/UpdateUserValidator'

export default class UsersController {
    public async store ({ request, response }: HttpContextContract) {
        const userPayload = await request.validate(CreateUser)
        const userByEmail = await User.findBy('email', userPayload.email)
        
        if (userByEmail) return response.conflict({ message: 'User already exists' })
        
        const user = await User.create(userPayload)
        return response.created({user})
    }

    public async update ({ request, response }: HttpContextContract){
        const userPayload = await request.validate(UpdateUser)
        const user = await User.findByOrFail('id', request.param('id'))
        user.merge(userPayload)
        await user.save()
        return response.ok({user})
    }

    public async delete ({ request, response }: HttpContextContract){
        const user = await User.findByOrFail('id', request.param('id'))
        await user.delete()
        return response.ok({user})
    }

    public async findAll ({ response }: HttpContextContract){
        const users = await User.all()
        return response.ok({users})
    }
}
