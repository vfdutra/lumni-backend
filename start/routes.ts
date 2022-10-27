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

//users
Route.post('/users', 'UsersController.store').as('users.store')
Route.put('/users/:id', 'UsersController.update').as('users.update')
Route.delete('/users/:id', 'UsersController.delete').as('users.delete')
Route.get('/findAllUsers', 'UsersController.findAll').as('users.findAll')
Route.post('/findUser/:id', 'UsersController.findUser').as('users.findUser')

//problem
Route.post('/problems', 'ProblemsController.store').as('problems.store')
Route.delete('/problems/:id', 'ProblemsController.delete').as('problems.delete')
Route.put('/problems/:id', 'ProblemsController.update').as('problems.update')
Route.get('/findAllProblems', 'ProblemsController.findAll').as('problems.findAll')

//options
Route.delete('/deleteOption/:id', 'ProblemsController.deleteOption').as('problems.deleteOption')
Route.get('/findProblem/:id', 'ProblemsController.findProblem').as('problems.findProblem')
