import { NextFunction, Request, Response } from 'express';
import { AppError, CustomError } from '../config/AppError';

export const handleGetAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = 'uhh';
    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

export const handleError = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(400, 'BAD_REQUEST');
  } catch (error) {
    next(error);
  }
};

export const handleCustomError = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new CustomError(418, 'Hello teapot');
  } catch (error) {
    next(error);
  }
};
