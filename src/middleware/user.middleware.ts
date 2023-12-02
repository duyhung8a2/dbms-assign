import { NextFunction, Request, Response } from 'express';
// import { UserModel } from '../models/user.model';
// import { AppError } from '../config/AppError';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';

// export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
//   const { userUuid } = req.params;
//   try {
//     const user = await UserModel.getByUuid(userUuid);
//     if (!user) {
//       throw new AppError(404, 'NOT_FOUND');
//     }
//     req.requestUser = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (bearer[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Invalid authorization format' });
    }

    jwt.verify(token, envConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
