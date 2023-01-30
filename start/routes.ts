/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.destroy').as('sessions.destroy')

Route.post('/users', 'UsersController.store').as('users.store')

//users
Route.put('/users/:id', 'UsersController.update').as('users.update')
Route.delete('/users/:id', 'UsersController.delete').as('users.delete')
Route.get('/findAllUsers', 'UsersController.findAll').as('users.findAll')
Route.get('/findUser/:id', 'UsersController.findUser').as('users.findUser')

//problem
Route.post('/problems', 'ProblemsController.store').as('problems.store')
Route.delete('/problems/:id', 'ProblemsController.delete').as('problems.delete')
Route.put('/problems/:id', 'ProblemsController.update').as('problems.update')
Route.get('/findAllProblems', 'ProblemsController.findAll').as('problems.findAll')
Route.delete('/deleteOption/:id', 'ProblemsController.deleteOption').as('problems.deleteOption')
Route.get('/findProblem/:id', 'ProblemsController.findProblem').as('problems.findProblem')
Route.get('/randomProblem/:id', 'ProblemsController.random').as('problems.random')
Route.get('/randomProblemByTheme/:id/theme/:id_theme', 'ProblemsController.randomByTheme').as('problems.randomByTheme')

//answers
Route.post('/answers', 'AnswersController.store').as('answers.store')
Route.put('/answers/:id', 'AnswersController.update').as('answers.update')
Route.delete('/answers/:id', 'AnswersController.delete').as('answers.delete')
Route.get('/findAnswer/:id', 'AnswersController.findAnswer').as('answers.findAnswer')
Route.get('/findAllAnswers', 'AnswersController.findAll').as('answers.findAll')
Route.get('/findAnswerByPlayer/:id', 'AnswersController.findAnswerByPlayer').as('answers.findAnswerByPlayer')

//players
Route.post('/players', 'PlayersController.store').as('players.store')
Route.put('/players/:id', 'PlayersController.update').as('players.update')
Route.delete('/players/:id', 'PlayersController.delete').as('players.delete')
Route.get('/findPlayer/:id', 'PlayersController.findPlayer').as('players.findPlayer')
Route.get('/findAllPlayers', 'PlayersController.findAll').as('players.findAll')
Route.get('/highscore', 'PlayersController.highscore').as('players.highscore')
Route.post('/addScore/:id', 'PlayersController.addScore').as('players.addScore')
  
//dashboard
Route.get('/numberOfQuestionsByThemes', 'DashboardController.numberOfQuestionsByThemes').as('dashboard.numberOfQuestionsByThemes')
Route.get('/answersStatsByThemes', 'DashboardController.answersStatsByThemes').as('dashboard.answersStatsByThemes')
Route.get('/answersByPlayer/:id', 'DashboardController.answersByPlayer').as('dashboard.answersByPlayer')
Route.get('/numberOfQuestionsByLevel', 'DashboardController.numberOfQuestionsByLevel').as('dashboard.numberOfQuestionsByLevel')

Route.get('/google/redirect', 'SessionsController.googleRedirect').as('sessions.googleRedirect')
Route.get('/google/callback', 'SessionsController.googleCallback').as('sessions.googleCallback')
