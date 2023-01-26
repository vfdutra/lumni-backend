import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Player from 'App/Models/Player'

export default class PlayersController {
  public async store({ request, response }: HttpContextContract) {
    const playerPayload = request.all()
    const player = new Player()
    player.merge(playerPayload)
    await player.save()
    return response.ok({ player })
  }
  
  public async update({ request, response }: HttpContextContract) {
    const playerPayload = request.all()
    const player = await Player.findByOrFail('id', request.param('id'))
    player.merge(playerPayload)
    await player.save()
    return response.ok({ player })
  }
  
  public async delete({ request, response }: HttpContextContract) {
    const player = await Player.findByOrFail('id', request.param('id'))
    await player.delete()
    return response.ok({ player })
  }
  
  public async findPlayer({ request, response }: HttpContextContract) {
    const player = await Player.findByOrFail('id', request
      .param('id'))
    return response.ok({ player })
  }

  public async findAll({ response }: HttpContextContract) {
    const players = await Player.all()
    return response.ok({ players })
  }

  public async highscore({ response }: HttpContextContract) {
    const players = await Player.query().orderBy('score', 'desc')
    return response.ok({ players })
  }

  public async addScore({ request, response }: HttpContextContract) {
    const player = await Player.findByOrFail('id', request.param('id'))
    const score = request.input('addScore')
    player.score = player.score + score
    await player.save()
    return response.ok({ player })
  }
}
