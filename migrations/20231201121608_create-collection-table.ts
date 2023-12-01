import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Collections', (table: Knex.TableBuilder) => {
    table.increments('collectionId').primary();
    table.string('name', 500);
    table.text('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Collections');
}
