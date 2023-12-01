import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ProductsInCategories', (table: Knex.TableBuilder) => {
    table.integer('productId').unsigned();
    table.integer('categoryId').unsigned();
    table.primary(['productId', 'categoryId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ProductsInCategories');
}
