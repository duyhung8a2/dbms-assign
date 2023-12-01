import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Orders', (table: Knex.TableBuilder) => {
    table.increments('orderId').primary();
    table.enum('status', ['Pending', 'Accepted', 'Shipping', 'Done', 'Canceled']).defaultTo('Pending');
    table.string('phone', 20);
    table.float('cost');
    table.string('note', 255);
    table.text('address', 'longtext');
    table.boolean('paid').defaultTo(false).notNullable();
    table.string('paymentMethod', 50).defaultTo('Cash');
    table.datetime('paymentDate').nullable();
    table.datetime('orderTime').notNullable().defaultTo(knex.fn.now());
    table.datetime('deliveryTime').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Orders');
}
