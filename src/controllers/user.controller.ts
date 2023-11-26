import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/user.model';

export const handleGetUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
