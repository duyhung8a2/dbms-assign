import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Carts', (table: Knex.TableBuilder) => {
    table.increments('cartId').primary();
    table.integer('productId').unsigned();
    table.integer('userId').notNullable();
    table.string('size', 10);
    table.integer('quantity').defaultTo(1);
    table.datetime('time').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Carts');
}
