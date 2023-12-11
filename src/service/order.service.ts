import { knex } from '../databases/knex';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

export class OrderService {
  static async createOrder({
    userId,
    phone,
    note,
    address
  }: {
    userId: number;
    phone: string;
    note: string;
    address: string;
    // cost: Float32Array;
    // paymentMethod: string;
    // orderTime: string;
  }) {
    const productsInCart = await CartService.getProductsInCart(userId);
    const totalCost = productsInCart.reduce((acc, curr) => {
      const cost = curr.size[0].price * curr.quantity;
      return acc + cost;
    }, 0);
    return await knex.transaction(async (trx) => {
      const [orderIdObj] = await trx('Orders')
        .insert({
          phone,
          cost: totalCost,
          note,
          address
        })
        .returning('orderId');
      const { orderId } = orderIdObj || {};
      await trx('UsersHaveOrders').insert({
        userId,
        orderId
      });
      for (const product of productsInCart) {
        await trx('ProductsInOrders').insert({
          orderId,
          productId: product.productId,
          size: product.size[0].sizeName,
          quantity: product.quantity
        });
        await trx('Sizes')
          .where({
            productId: product.productId,
            sizeName: product.size[0].sizeName
          })
          .decrement('quantity', product.quantity);
      }
      await trx('Carts').where({ userId }).del(); // Delete all hết product in cart
      await trx.commit();
    });
  }

  static async getAllOrder(userId: number) {
    try {
      const usersHavesOrders = await knex('UsersHaveOrders').select('orderId').where({ userId });
      const listOrder: any = [];
      for (const order of usersHavesOrders) {
        const { orderId } = order;
        const productIdSizeObjs = await knex('ProductsInOrders').where({ orderId }).select('productId', 'size');
        const listProduct = [];
        for (const productIdSizeObj of productIdSizeObjs) {
          const product = await ProductService.getProductByIdAndSize(
            Number(productIdSizeObj.productId),
            productIdSizeObj.size
          );
          listProduct.push(product);
        }
        const orderInfor: any = await knex('Orders').where({ orderId }).select('*').first();
        console.log('check orderInfor:', orderInfor);
        orderInfor.listProductInfo = listProduct;
        listOrder.push(orderInfor);
      }
      return listOrder;
    } catch (error) {
      console.error('get Order error:', error);
      throw error;
    }
  }
}
