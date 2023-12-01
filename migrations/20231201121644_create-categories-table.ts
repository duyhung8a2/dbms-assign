import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Categories', (table: Knex.TableBuilder) => {
    table.increments('categoryId').primary();
    table.string('name', 500).unique();
    table.text('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Categories');
}
