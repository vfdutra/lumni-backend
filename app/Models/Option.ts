import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Problem from './Problem'

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public problem_id: any

  @column()
  public correct: number

  @belongsTo(() => Problem, {
    localKey: 'problem_id',
  })
  public problem: BelongsTo<typeof Problem>
}