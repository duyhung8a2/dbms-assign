import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('UsersRatingProducts', (table: Knex.TableBuilder) => {
    table.integer('userId').unsigned();
    table.integer('productId').unsigned();
    table.datetime('time').defaultTo(knex.fn.now());
    table.text('comment');
    table.integer('star');
    table.primary(['userId', 'productId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('UsersRatingProducts');
}
