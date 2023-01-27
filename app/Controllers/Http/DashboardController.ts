import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Problem from 'App/Models/Problem'
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

    return response.ok({ numberOfQuestionsByThemes, total: numberOfQuestionsByThemes.length })
  }

  public async numberOfQuestionsByLevel ({ response }: HttpContextContract) {
    const levels = await Database
                          .query()
                          .select('level')
                          .count('*','numberOfQuestions')
                          .from('problems')
                          .groupBy('level')
                          .orderBy('level', 'asc')
    return response.ok({ levels, total: levels.length })
  }

  public async answersStatsByThemes ({ response }: HttpContextContract) {
    const problems = await Problem.query()
    const themes = await Problem.query().select('theme').distinct()
    const options = await Option.query()
    const answers = await Answer.query()
    const answerStatsByTheme = themes.map((theme) => {
      const problemsByTheme = problems.filter(problem => problem.theme === theme.theme)
      const numberOfAnswersByTheme = answers.filter(answer => problemsByTheme.map(problem => problem.id).includes(answer.problem_id)).length

      let countCorrect = 0;
      problems.filter(problem => problem.theme === theme.theme).map((problem) => {
        const correctOption = options.filter(option => option.problem_id === problem.id && option.correct === 1)[0]
        const correctAnswers = answers.filter(answer => answer.option_id === correctOption.id).length
        countCorrect += correctAnswers
      })
      const countWrong = numberOfAnswersByTheme-countCorrect;
      return { theme: theme.theme, numberOfQuestions: problemsByTheme.length, numberOfAnswersByTheme: numberOfAnswersByTheme, correctAnswers: countCorrect, wrongAnswers: countWrong }
    })
    return response.ok({ answerStatsByTheme })
  }

  public async answersByPlayer ({ response }: HttpContextContract) {
    const player = await Player.all()    
    const playerData = await Promise.all(
      player.map(async (player) => {
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
        
        return {...player.$attributes, correctAnswers, wrongAnswers, average }
      })
    )
    return response.ok(playerData)
  }
}
