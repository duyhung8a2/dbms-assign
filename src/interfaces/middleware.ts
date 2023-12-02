import { UserModel } from '../models/user.model';

export type UserRequest = Exclude<Awaited<ReturnType<typeof UserModel.getById>>, null>;
