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

Route.post('/users', 'UsersController.store').as('users.store')

Route.put('/users/:id', 'UsersController.update').as('users.update').middleware('auth')

Route.get('/teste', async () => {
  return { status : 200}
})

Route.get('/findAllUsers', 'UsersController.findAll').as('users.findAll')

Route.get('/findUser/:id', 'UsersController.findUser').as('users.findUser')