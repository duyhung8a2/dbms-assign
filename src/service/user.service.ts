import bcrypt from 'bcrypt';
import { knex } from '../databases/knex';
import { User } from '../models/user.model';
import * as credential from '../credentials/firebaseCredential.json';
import * as admin from 'firebase-admin';

export class UserService {
  private storage: admin.storage.Storage;
  private allowImageType = ['image/jpg', 'image/jpeg', 'image/png'];

  _checkCondition(image: Express.Multer.File, maxSize: number = 5242880) {
    try {
      if (!image) {
        throw Error('Invalid image');
      }
      const contentType = image['mimetype'];
      if (!this.allowImageType.includes(contentType)) {
        throw new Error('File is not an image');
      }
      if (image['size'] > maxSize) {
        throw new Error(`Image must be smaller than ${maxSize / 1048576}MB`);
      }
      return true;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  constructor() {
    const serviceAccount = <admin.ServiceAccount>{
      ...credential
    };
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.STORAGE_BUCKET
    });

    this.storage = admin.storage();
  }
  async uploadImage(image: Express.Multer.File, maxSize: number = 5242880) {
    try {
      this._checkCondition(image, maxSize);
      const contentType = image['mimetype'];
      const originalName = image['originalname'];
      const limitLengthOfOriginalName = originalName.substring(originalName.length - 100);
      const uniqueName = Date.now() + '_' + Math.round(Math.random() * 1000) + limitLengthOfOriginalName;
      const fileUpload = this.storage.bucket().file(`images/${uniqueName}`);
      const bufferData = Buffer.from(image['buffer']);
      await fileUpload.save(bufferData, {
        metadata: {
          contentType: contentType
        }
      });
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      });
      return url;
    } catch (e: any) {
      throw new Error(e);
    }
  }
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
  static async checkUserIsExisted(email: string): Promise<boolean | null> {
    const users: User[] = await knex('Users').where({ email }).select('*').limit(1);
    if (users.length > 0) {
      return true;
    }
    return false;
  }
}
