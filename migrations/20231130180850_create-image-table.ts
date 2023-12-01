import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Images', (table: Knex.TableBuilder) => {
    table.integer('productId').unsigned();
    table.string('imageLink', 500);
    table.primary(['productId', 'imageLink']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Images');
}
