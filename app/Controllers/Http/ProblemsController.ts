import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Problem from 'App/Models/Problem'

export default class ProblemsController {
    public async store({ request, response }: HttpContextContract) {
        const problemPayload = request.only(['description', 'level', 'tips'])
        const problem = await Problem.create(problemPayload)
        return response.created({ problem })
    }
    
    public async update({ request, response }: HttpContextContract) {
        const problemPayload = await request.only(['description', 'level', 'tips'])
        const problem = await Problem.findByOrFail('id', request.param('id'))
        problem.merge(problemPayload)
        await problem.save()
        return response.ok({ problem })
    }
    
    public async delete({ request, response }: HttpContextContract) {
        const problem = await Problem.findByOrFail('id', request.param('id'))
        await problem.delete()
        return response.ok({ problem })
    }
}
