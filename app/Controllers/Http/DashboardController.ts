import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Problem from 'App/Models/Problem'
import Option from 'App/Models/Option'
import Answer from 'App/Models/Answer'  


export default class DashboardController {
  public async numberOfQuestionsByThemes({ response }: HttpContextContract) {
    const problems = await Problem.query()
    const themes = await Problem.query().select('theme').distinct()
    const numberOfQuestionsByThemes = themes.map((theme) => {
      const numberOfQuestions = problems.filter(problem => problem.theme === theme.theme).length  
      return { theme: theme.theme, questions: numberOfQuestions }
    })
    return response.ok({ numberOfQuestionsByThemes })
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
        const correctAnswers = answers.filter(answer => answer.id_answer === correctOption.id).length
        countCorrect += correctAnswers
      })
      const countWrong = numberOfAnswersByTheme-countCorrect;
      return { theme: theme.theme, numberOfQuestions: problemsByTheme.length, numberOfAnswersByTheme: numberOfAnswersByTheme, correctAnswers: countCorrect, wrongAnswers: countWrong }
    })
    return response.ok({ answerStatsByTheme })
  }

}
