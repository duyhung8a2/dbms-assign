import { knex } from '../databases/knex';

export class RatingService {
  static async post({
    productId,
    userId,
    star,
    comment
  }: {
    productId: number;
    userId: number;
    star: number;
    comment: string;
  }): Promise<void> {
    await knex('UsersRatingProducts').insert({
      productId,
      userId,
      star,
      comment
    });
  }

  static async getProductRating(productId: number): Promise<any> {
    const res = await knex('UsersRatingProducts').select('*').where({ productId });
    return res;
  }

  static async getUserRating(userId: number): Promise<any> {
    console.log('check userId: ', 'userId');
    const res = await knex('UsersRatingProducts').select('*').where({ userId });
    return res;
  }

  static async updateUserRating({
    productId,
    userId,
    star,
    comment
  }: {
    productId: number;
    userId: number;
    star: number;
    comment: string;
  }): Promise<void> {
    try {
      await knex('UsersRatingProducts').where({ productId, userId }).update({ star, comment });
    } catch (error) {
      console.error('Error updating user rating:', error);
      throw error;
    }
  }
}
