import { knex } from '../databases/knex';

export interface Cart {
  cartId?: number;
  productId?: number;
  userId?: number;
  size?: string;
  quantity?: number;
}

export class CartModel {
  static async create(cartData: Cart) {
    const { productId, userId, size, quantity } = cartData;
    try {
      await knex('Carts').insert({
        productId,
        userId,
        size,
        quantity
      });
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  }
  static async update(cartData: Cart) {
    const { cartId, size, quantity } = cartData;
    try {
      await knex('Carts').where({ cartId }).update({
        size,
        quantity
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }
  static async deleteById(cartId: number) {
    try {
      await knex('Carts').where({ cartId }).del();
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw error;
    }
  }

  static async deleteAll() {
    try {
      await knex('Carts').del();
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw error;
    }
  }
}
