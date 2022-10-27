import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Problem from 'App/Models/Problem'
import Option from 'App/Models/Option'

export default class ProblemsController {
    public async store({ request, response }: HttpContextContract) {
        const problemsList = request.input("problems");
        problemsList.forEach(problem => {
            const newProblem = new Problem();
            newProblem.description = problem.description;
            newProblem.level = problem.level;
            newProblem.tips = problem.tips;
            
            newProblem.related('options').createMany(problem.options);
        });

        return response.ok({ problemsList })
    }
    
    public async update({ request, response }: HttpContextContract) {
        const problemPayload = request.all()
        const problem = await Problem.findByOrFail('id', request.param('id'))
        problem.merge(problemPayload)
        await problem.save()

        problemPayload.options.forEach(async (option: any) => {
            const optionModel = await Option.findByOrFail('id', option.id)
            optionModel.merge(option)
            await optionModel.save()
        })

        return response.ok({ problem })
    }
    
    public async delete({ request, response }: HttpContextContract) {
        const problem = await Problem.findByOrFail('id', request.param('id'))
        await problem.delete()
        return response.ok({ problem })
    }

    public async deleteOption({ request, response }: HttpContextContract) {
        const option = await Option.findByOrFail('id', request.param('id'))
        await option.delete()
        return response.ok({ option })
    }

    public async findProblem({ request, response }: HttpContextContract) {
        const problem = await Problem.findByOrFail('id', request.param('id'))
        const options = await problem.related('options').query()
        return response.ok({ problem, options })
    }

    public async findAll({ response }: HttpContextContract) {
        const problems = await Problem.all()
        return response.ok({ problems })
    }
}
