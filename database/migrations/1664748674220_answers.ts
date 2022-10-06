import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('player_id').unsigned().references('id').inTable('players').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('problem_id').unsigned().references('id').inTable('problems').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('answer', 255).notNullable()
      table.bigInteger('used_time').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
