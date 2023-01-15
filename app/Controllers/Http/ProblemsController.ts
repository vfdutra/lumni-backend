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
            newProblem.theme = problem.theme;
            newProblem.level = problem.level;
            newProblem.tips = problem.tips;

            if(problem.options.length != 5){
                return response.badRequest({ message: 'Number of options must be 5' })
            }  else{
                newProblem.related('options').createMany(problem.options);
            }
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
                                    .select('description')
                                    .from('levels as l')
                                    .join('players as p', 'p.player_level', 'l.id')
                                    .where('p.id',request.param('id'))                                    

        const levelsBetween = playerLevel[0].description.substring(0, playerLevel[0].description.indexOf(' '));        

        const alreadyAnswered = await Answer
                                        .query()
                                        .select('problem_id')
                                        .where('player_id', request.param('id'));

        const alreadyAnsweredIds = alreadyAnswered.map((answer) => answer.problem_id);

        const problems = await Database
                                .query()
                                .select('p.id', 'p.description', 'p.tips')
                                .from('problems as p')
                                .join('levels as l', 'l.id', 'p.level')
                                .whereNotIn('p.id', alreadyAnsweredIds)
                                .where('l.description', 'like', `${levelsBetween}%`)
                                .orderByRaw('RANDOM()')
                                .limit(1);

        const options = await Database
                                .query()
                                .select('id', 'description', 'correct')
                                .from('options')
                                .where('problem_id', problems[0].id);
                            
        return response.ok({ problems, options })
    }
    
    public async randomByTheme({ request, response }: HttpContextContract) {
        const playerLevel = await Database
                                    .query()
                                    .select('description')
                                    .from('levels as l')
                                    .join('players as p', 'p.player_level', 'l.id')
                                    .where('p.id',request.param('id'))                                    

        const levelsBetween = playerLevel[0].description.substring(0, playerLevel[0].description.indexOf(' '));        

        const alreadyAnswered = await Answer
                                        .query()
                                        .select('problem_id')
                                        .where('player_id', request.param('id'));

        const alreadyAnsweredIds = alreadyAnswered.map((answer) => answer.problem_id);

        const problems = await Database
                                .query()
                                .select('p.id', 'p.description', 'p.tips')
                                .from('problems as p')
                                .join('levels as l', 'l.id', 'p.level')
                                .whereNotIn('p.id', alreadyAnsweredIds)
                                .where('l.description', 'like', `${levelsBetween}%`)
                                .where('p.theme', request.param('id_theme'))
                                .orderByRaw('RANDOM()')
                                .limit(1);

        const options = await Database
                                .query()
                                .select('id', 'description', 'correct')
                                .from('options')
                                .where('problem_id', problems[0].id);
                            
        return response.ok({ problems, options })
    }
}
