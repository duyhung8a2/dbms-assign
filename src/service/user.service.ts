import { knex } from '../databases/knex';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

export class UserService {
  static async getByEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
      const users: User[] = await knex('Users').where({ email }).select('*').limit(1);

      if (users.length > 0) {
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return user;
        }
      }
      return null;
    } catch (error: any) {
      throw new Error(`Failed to fetch user by email and password: ${error.message}`);
    }
  }
}
