import jwt from 'jsonwebtoken';
import { envConfig as env } from '../config/env.config';

export class AuthService {
  static generateToken(userId: number, email: string, userRole: string): string {
    try {
      const token = jwt.sign({ userId, email, userRole }, env.JWT_SECRET, { expiresIn: env.EXPIRED_IN });
      return token;
    } catch (error) {
      throw new Error('Sign token failed');
    }
  }

  static verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
