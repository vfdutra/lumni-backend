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

Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.destroy').as('sessions.destroy')

Route.post('/users/create', 'UsersController.store').as('users.store')

// Route
//   .group(() => {

  Route
  .group(() => {
    Route.put('/update/:id', 'UsersController.update').as('users.update')
    Route.delete('/delete/:id', 'UsersController.delete').as('users.delete')
    Route.get('/findAll', 'UsersController.findAll').as('users.findAll')
    Route.post('/findOne/:id', 'UsersController.findUser').as('users.findUser')
  })
  .prefix('/users')

Route
 .group(() => {
    Route.post('/create', 'ProblemsController.store').as('problems.store')
    Route.delete('/delete/:id', 'ProblemsController.delete').as('problems.delete')
    Route.put('/update/:id', 'ProblemsController.update').as('problems.update')
    Route.get('/findAll', 'ProblemsController.findAll').as('problems.findAll')
    Route.delete('/deleteOption/:id', 'ProblemsController.deleteOption').as('problems.deleteOption')
    Route.get('/findOne/:id', 'ProblemsController.findProblem').as('problems.findProblem')
    Route.get('/random', 'ProblemsController.random').as('problems.random')
  })
  .prefix('/problems')

Route
  .group(() => {
    Route.post('/create', 'AnswersController.store').as('answers.store')
    Route.put('/update/:id', 'AnswersController.update').as('answers.update')
    Route.delete('/delete/:id', 'AnswersController.delete').as('answers.delete')
    Route.get('/findAll', 'AnswersController.findAll').as('answers.findAll')
    Route.get('/findOne/:id', 'AnswersController.findAnswer').as('answers.findAnswer')
    Route.get('/findByPlayer/:id', 'AnswersController.findAnswerByPlayer').as('answers.findAnswerByPlayer')
  })
  .prefix('/answers')

Route
  .group(() => {
    Route.post('/create', 'PlayersController.store').as('players.store')
    Route.put('/update/:id', 'PlayersController.update').as('players.update')
    Route.delete('/delete/:id', 'PlayersController.delete').as('players.delete')
    Route.get('/findOne/:id', 'PlayersController.findPlayer').as('players.findPlayer')
    Route.get('/findAll', 'PlayersController.findAll').as('players.findAll')
    Route.get('/getHighscore', 'PlayersController.highscore').as('players.highscore')
  })
  .prefix('/players')
// })
// .middleware('auth:api')