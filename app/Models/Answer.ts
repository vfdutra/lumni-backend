import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Player from 'App/Models/Player'
import Problem from 'App/Models/Problem'
import Options from 'App/Models/Option'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number
 
  @column()
  public used_time: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public player_id: number

  @column()
  public problem_id: number

  @column()
  public option_id: number

  @belongsTo(() => Player, {
    localKey: 'player_id',
  })
  public player: BelongsTo<typeof Player>

  @belongsTo(() => Problem, {
    localKey: 'problem_id',
  })
  public problem: BelongsTo<typeof Problem>

  @belongsTo(() => Options, {
    localKey: 'option_id',
  })
  public option: BelongsTo<typeof Options>  
}
