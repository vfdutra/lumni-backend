import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public problemId: number

  @column()
  public correct: number
}