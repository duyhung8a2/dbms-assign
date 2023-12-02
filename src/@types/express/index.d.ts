import { PostRequest, UserRequest, GroupRequest, User } from '../../interfaces/middleware';
import { User } from './models/user.model';

declare global {
  namespace Express {
    export interface Request {
      requestUser: UserRequest;
      requestPost: PostRequest;
      requestGroup: GroupRequest;
      requestFollowed: UserRequest;
      user?: User;
    }
  }
}
