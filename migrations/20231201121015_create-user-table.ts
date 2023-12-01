import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Users', (table: Knex.TableBuilder) => {
    table.increments('userId').primary();
    table.string('name', 255);
    table.string('phone', 20).unique();
    table.string('sex', 10);
    table.string('email', 100).unique();
    table.string('password', 255);
    table.string('avatar', 500);
    table.text('address', 'longtext');
    table.string('role', 10).defaultTo('customer');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Users');
}
