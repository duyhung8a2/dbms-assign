import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Products', (table: Knex.TableBuilder) => {
    table.increments('productId').primary();
    table.string('name', 500);
    table.text('description');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.boolean('deleted').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Products');
}
