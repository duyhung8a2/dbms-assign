import { knex } from '../databases/knex';
export class UserModel {
  static async getAll() {
    return await knex.raw('SELECT * FROM EMPLOYEE');
  }
}
