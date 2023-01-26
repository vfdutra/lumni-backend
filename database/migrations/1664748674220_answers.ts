import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'answers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()      
      table.bigInteger('used_time').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.integer('player_id').unsigned().references('id').inTable('players')
      table.integer('problem_id').unsigned().references('id').inTable('problems')
      table.integer('option_id').unsigned().references('id').inTable('options')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
