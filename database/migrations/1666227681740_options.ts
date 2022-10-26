import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'options'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description', 255).notNullable()
      table.integer('problem_id').unsigned().references('id').inTable('problems').onUpdate('CASCADE').onDelete('CASCADE')
      table.tinyint('correct')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
