import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'

export default class AnswersController {
    public async store({ request, response }: HttpContextContract) {
        const answerPayload = request.all()
        const answer = new Answer()
        answer.merge(answerPayload)
        await answer.save()
        return response.ok({ answer })
    }
    
    public async update({ request, response }: HttpContextContract) {
        const answerPayload = request.all()
        const answer = await Answer.findByOrFail('id', request.param('id'))
        answer.merge(answerPayload)
        await answer.save()
        return response.ok({ answer })
    }
    
    public async delete({ request, response }: HttpContextContract) {
        const answer = await Answer.findByOrFail('id', request.param('id'))
        await answer.delete()
        return response.ok({ answer })
    }
    
    public async findAnswer({ request, response }: HttpContextContract) {
        const answer = await Answer.findByOrFail('id', request.param('id'))
        return response.ok({ answer })
    }
    
    public async findAll({ response }: HttpContextContract) {
        const answers = await Answer.all()
        return response.ok({ answers })
    }
  
    public async findAnswerByPlayer({ request, response }: HttpContextContract) {
        const answers = await Answer.query().where('player_id', request.param('id'))
        return response.ok({ answers })
    }
    
}
