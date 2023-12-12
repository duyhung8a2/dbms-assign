import { knex } from '../databases/knex';

export class CartService {
  static async getProductsInCart(userId: number) {
    const productsInCart = await knex('Carts').select('*').where({ userId });

    // Array to store promises for each asynchronous operation
    const promises = productsInCart.map(async (product) => {
      const sizePromise = knex('Sizes')
        .select('*')
        .where('Sizes.sizeName', product.size)
        .andWhere('Sizes.productId', product.productId);
      const imagesPromise = knex('Images').select('imageLink').where('Images.productId', product.productId);
      const productInfoPromise = knex('Products')
        .select('name', 'description')
        .where({ productId: product.productId })
        .first();

      // Await both promises concurrently using Promise.all
      const [size, images, productInfo] = await Promise.all([sizePromise, imagesPromise, productInfoPromise]);

      product.name = productInfo.name;
      product.description = productInfo.description;
      product.size = size;
      product.images = images;
    });

    // Wait for all promises to resolve before returning the modified productsInCart
    await Promise.all(promises);

    return productsInCart;
  }

  static async checkIsProductInCart(productId: number, size: string) {
    const productExists = await knex('Carts').where('productId', productId).andWhere('size', size).first();
    return !!productExists;
  }
}
