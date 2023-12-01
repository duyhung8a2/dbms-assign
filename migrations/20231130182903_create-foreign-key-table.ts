import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Carts', (table: Knex.TableBuilder) => {
    table.foreign('userId', 'cart_user_fk').references('userId').inTable('Users').onDelete('CASCADE');
  });
  await knex.schema.alterTable('Carts', (table: Knex.TableBuilder) => {
    table.foreign('productId', 'cart_product_fk').references('productId').inTable('Products').onDelete('CASCADE');
  });
  await knex.schema.alterTable('ProductsInOrders', (table: Knex.TableBuilder) => {
    table
      .foreign('productId', 'productinorder_product_fk')
      .references('productId')
      .inTable('Products')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('ProductsInOrders', (table: Knex.TableBuilder) => {
    table.foreign('orderId', 'productinorder_order_fk').references('orderId').inTable('Orders').onDelete('CASCADE');
  });
  await knex.schema.alterTable('UsersHaveOrders', (table: Knex.TableBuilder) => {
    table.foreign('orderId', 'userhaveorders_order_fk').references('orderId').inTable('Orders').onDelete('CASCADE');
  });
  await knex.schema.alterTable('UsersHaveOrders', (table: Knex.TableBuilder) => {
    table.foreign('userId', 'userhaveorders_user_fk').references('userId').inTable('Users').onDelete('CASCADE');
  });
  await knex.schema.alterTable('ProductsInCollections', (table: Knex.TableBuilder) => {
    table
      .foreign('productId', 'productsincollection_product_fk')
      .references('productId')
      .inTable('Products')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('ProductsInCollections', (table: Knex.TableBuilder) => {
    table
      .foreign('collectionId', 'productsincollection_collection_fk')
      .references('collectionId')
      .inTable('Collections')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('ProductsInCategories', (table: Knex.TableBuilder) => {
    table
      .foreign('productId', 'productsincategory_product_fk')
      .references('productId')
      .inTable('Products')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('ProductsInCategories', (table: Knex.TableBuilder) => {
    table
      .foreign('categoryId', 'productsincategory_category_fk')
      .references('categoryId')
      .inTable('Categories')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('UsersRatingProducts', (table: Knex.TableBuilder) => {
    table
      .foreign('productId', 'userratingproducts_product_fk')
      .references('productId')
      .inTable('Products')
      .onDelete('CASCADE');
  });
  await knex.schema.alterTable('Details', (table: Knex.TableBuilder) => {
    table.foreign('productId', 'detail_product_fk').references('productId').inTable('Products').onDelete('CASCADE');
  });
  await knex.schema.alterTable('Sizes', (table: Knex.TableBuilder) => {
    table.foreign('productId', 'size_product_fk').references('productId').inTable('Products').onDelete('CASCADE');
  });
  await knex.schema.alterTable('Images', (table: Knex.TableBuilder) => {
    table.foreign('productId', 'image_product_fk').references('productId').inTable('Products').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('Carts', (table: Knex.TableBuilder) => {
    table.dropForeign('cart_user_fk');
    table.dropForeign('cart_product_fk');
  });

  await knex.schema.alterTable('ProductsInOrders', (table: Knex.TableBuilder) => {
    table.dropForeign('productinorder_product_fk');
    table.dropForeign('productinorder_order_fk');
  });

  await knex.schema.alterTable('UsersHaveOrders', (table: Knex.TableBuilder) => {
    table.dropForeign('userhaveorders_order_fk');
    table.dropForeign('userhaveorders_user_fk');
  });

  await knex.schema.alterTable('ProductsInCollections', (table: Knex.TableBuilder) => {
    table.dropForeign('productsincollection_product_fk');
    table.dropForeign('productsincollection_collection_fk');
  });

  await knex.schema.alterTable('ProductsInCategories', (table: Knex.TableBuilder) => {
    table.dropForeign('productsincategory_product_fk');
    table.dropForeign('productsincategory_category_fk');
  });

  await knex.schema.alterTable('UsersRatingProducts', (table: Knex.TableBuilder) => {
    table.dropForeign('userratingproducts_product_fk');
  });

  await knex.schema.alterTable('Details', (table: Knex.TableBuilder) => {
    table.dropForeign('detail_product_fk');
  });

  await knex.schema.alterTable('Sizes', (table: Knex.TableBuilder) => {
    table.dropForeign('size_product_fk');
  });

  await knex.schema.alterTable('Images', (table: Knex.TableBuilder) => {
    table.dropForeign('image_product_fk');
  });
}
