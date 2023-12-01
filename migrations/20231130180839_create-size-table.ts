import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Sizes', (table: Knex.TableBuilder) => {
    table.string('sizeName', 10);
    table.integer('quantity');
    table.integer('productId').unsigned();
    table.float('price');
    table.primary(['sizeName', 'quantity', 'productId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Sizes');
}
