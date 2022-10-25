import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Problem from './Problem'

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public problemId: number

  @column()
  public correct: number

  @belongsTo(() => Problem, {
    localKey: 'problemId'
  })
  public problem: BelongsTo<typeof Problem>
}