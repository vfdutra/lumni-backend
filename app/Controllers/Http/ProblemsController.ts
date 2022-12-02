import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Problem from 'App/Models/Problem'
import Option from 'App/Models/Option'
import Database from '@ioc:Adonis/Lucid/Database';
import Answer from 'App/Models/Answer';


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

    public async random({ request, response }: HttpContextContract) {
        const playerLevel = await Database
                                    .query()
                                    .select('p.level')
                                    .from('problems as p')
                                    .join('players as p2', 'p2.player_level', '=', 'p.level')
                                    .where('p2.id',request.param('id'))
                                    .groupBy('p.level')

        const alreadyAnswered = await Answer
                                        .query()
                                        .select('problem_id')
                                        .where('player_id', 1);

        const alreadyAnsweredIds = alreadyAnswered.map((answer) => answer.problem_id);
        const problems = await Database
                                .query()
                                .from('problems')
                                .whereNotIn('id', alreadyAnsweredIds)
                                .where('level', playerLevel[0].level)
                                .orderByRaw('RANDOM()')
                                .limit(1);

        const options = await Database
                                .query()
                                .from('options')
                                .where('problem_id', problems[0].id);
                            
        return response.ok({ problems, options })
    }
}
