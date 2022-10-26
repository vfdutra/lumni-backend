import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Problem from 'App/Models/Problem'

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

    public async findAll({ response }: HttpContextContract) {
        const problems = await Problem.all()
        return response.ok({ problems })
    }

    public async findLastId()  {
        const id = await Problem.query().orderBy('id', 'desc').first();

        console.log(id?.$attributes.id);

        return id?.$attributes.id;
    }
}
