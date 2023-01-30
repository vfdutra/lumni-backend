import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Option from 'App/Models/Option'
import Answer from 'App/Models/Answer'  
import Player from 'App/Models/Player'
import Database from '@ioc:Adonis/Lucid/Database'
export default class DashboardController {
  public async numberOfQuestionsByThemes({ response }: HttpContextContract) {
    const numberOfQuestionsByThemes = await Database
                            .query()
                            .select('theme')
                            .from('problems')
                            .count('*', 'questions')
                            .groupBy('theme')
                            .orderBy('theme', 'asc')

    const total = await Database
                          .query() 
                          .count('*','total')
                          .from('problems')                          

    return response.ok({ numberOfQuestionsByThemes, total: total[0].total})
  }

  public async numberOfQuestionsByLevel ({ response }: HttpContextContract) {
    const levels = await Database
                          .query()
                          .select('level')
                          .count('*','numberOfQuestions')
                          .from('problems')
                          .groupBy('level')
                          .orderBy('level', 'asc')

    const total = await Database
                        .query() 
                        .count('*','total')
                        .from('problems')    

    return response.ok({ levels, total: total[0].total })
  }

  public async answersStatsByThemes ({ response }: HttpContextContract) {
    const answerStatsByTheme = await Database
      .query()
      .select('theme')
      .from('problems')
      .count('*', 'numberOfQuestions')
      .groupBy('theme')
      .orderBy('theme', 'asc')
      .then(async (themes) => {
        const answerStatsByTheme = await Promise.all(
          themes.map(async (theme) => {
            const numberOfAnswersByTheme = await Database
              .query()
              .select('problem_id')
              .from('answers')
              .where('problem_id', 'in', Database
                .query()
                .select('id')
                .from('problems')
                .where('theme', theme.theme)
              )
              .count('*', 'numberOfAnswersByTheme')
              .groupBy('problem_id')
              .orderBy('problem_id', 'asc')
            const numberOfAnswersByThemeTotal = numberOfAnswersByTheme.reduce((acc, cur) => acc + cur.numberOfAnswersByTheme, 0)
            const correctAnswers = await Database
              .query()
              .select('problem_id')
              .from('answers')
              .where('option_id', 'in', Database
                .query()
                .select('id')
                .from('options')
                .where('correct', 1)
              )
              .where('problem_id', 'in', Database
                .query()
                .select('id')
                .from('problems')
                .where('theme', theme.theme)
              )
              .count('*', 'correctAnswers')
              .groupBy('problem_id')
              .orderBy('problem_id', 'asc')
            const correctAnswersTotal = correctAnswers.reduce((acc, cur) => acc + cur.correctAnswers, 0)
            const wrongAnswers = numberOfAnswersByThemeTotal - correctAnswersTotal
            return { theme: theme.theme, numberOfQuestions: theme.numberOfQuestions, numberOfAnswersByTheme: numberOfAnswersByThemeTotal, correctAnswers: correctAnswersTotal, wrongAnswers }
          })
        )
        return answerStatsByTheme
      })
    return response.ok({ answerStatsByTheme })
  }

  public async answersByPlayer ({ response, request}: HttpContextContract) {
    const player_id = request.param('id')    
    const player = await Player.findOrFail(player_id)
    const answers = await Answer.query().where('player_id', player.id)
    const options = await Promise.all(
      answers.map(async (answer) => {
        return await Option.query().where('id', answer.option_id)
      })
    )
    const correctAnswers = options
      .flat()
      .filter((option) => option.correct === 1).length
    const wrongAnswers = options
      .flat()
      .filter((option) => option.correct === 0).length
    const average = (correctAnswers / (correctAnswers + wrongAnswers)) * 100
    
    const playerData = {...player.$attributes, correctAnswers, wrongAnswers, average }
    return response.ok(playerData)
  }
}
