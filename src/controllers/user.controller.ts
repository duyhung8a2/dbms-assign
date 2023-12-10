import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

export const handleGetUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const handleGetUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.getById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const handleSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // role: ['admin', 'customer'], default is 'customer'
    const { name, phone, email, password, rePassword, role } = req.body;
    const isExistedUser = await UserService.checkUserIsExisted(email);
    if (isExistedUser) {
      return res.status(401).json({ message: 'User has already existed!!!' });
    }
    await UserModel.create({ name, phone, email, password, rePassword, role });
    res.status(201).json({ message: 'Create successfully!!!' });
  } catch (error) {
    next(error);
  }
};

export const handleSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token =
      user.userId && user.email && user.role && AuthService.generateToken(user.userId, user.email, user.role);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
