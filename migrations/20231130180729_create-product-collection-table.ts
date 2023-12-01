import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ProductsInCollections', (table: Knex.TableBuilder) => {
    table.integer('productId').unsigned();
    table.integer('collectionId').unsigned();
    table.primary(['productId', 'collectionId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ProductsInCollections');
}
