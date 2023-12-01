import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ProductsInOrders', function (table) {
    table.integer('productId').notNullable();
    table.integer('orderId').notNullable();
    table.string('size', 10);
    table.integer('quantity').notNullable();

    table.primary(['productId', 'orderId', 'size']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ProductsInOrders');
}
