import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Option from 'App/Models/Option'

export default class Problem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @hasMany(() => Option, {
    foreignKey: 'problem_id',
  })
  public options: HasMany<typeof Option>

  @column()
  public theme: number

  @column()
  public level: number

  @column()
  public tips: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
