import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('UsersHaveOrders', (table: Knex.TableBuilder) => {
    table.integer('orderId').primary();
    table.integer('userId');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('UsersHaveOrders');
}
