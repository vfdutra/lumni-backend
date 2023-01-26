import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Answer from './Answer'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ranking: number

  @column()
  public score: number

  @column()
  public player_level: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public user_id: number

  @belongsTo(() => User, {
    localKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Answer, {
    localKey: 'user_id',
  })
  public answer: HasMany<typeof Answer>
}
