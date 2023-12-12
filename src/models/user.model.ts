import { knex } from '../databases/knex';
import bcrypt from 'bcrypt';

export interface User {
  userId?: number;
  name?: string;
  phone?: string;
  sex?: string;
  email: string;
  password: string;
  rePassword?: string;
  avatar?: string;
  address?: string;
  role?: string;
  createdAt?: Date;
}

export class UserModel {
  static async create(payload: User): Promise<void> {
    try {
      if (payload.rePassword !== payload.password) {
        throw new Error('Passwords do not match');
      }
      delete payload.rePassword;
      const hashedPassword = await bcrypt.hash(payload.password || 'password', 10);
      const newUser: User = { ...payload, password: hashedPassword };

      await knex('Users').insert(newUser);
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  static async update(userId: number, payload: User): Promise<void> {
    try {
      const newUser: User = payload;

      await knex('Users').update(newUser).where({ userId });
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  static async getAll(): Promise<User[]> {
    try {
      const users: User[] = await knex('Users').select('*');
      return users;
    } catch (error: any) {
      throw new Error(`Failed to get all users: ${error.message}`);
    }
  }

  static async getById(id: string): Promise<User | null> {
    try {
      const user: User[] = await knex('Users').where('userId', id).select('*').limit(1);
      return user.length > 0 ? user[0] : null;
    } catch (error: any) {
      throw new Error(`Failed to get user by ID: ${error.message}`);
    }
  }
}
