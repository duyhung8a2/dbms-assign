import express from 'express';
import {
  handleGetUserById,
  handleGetUsers,
  handleSignIn,
  handleSignUp,
  uploadImage
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/user.middleware';
export const userRouter = express.Router();
import { uploadMulter } from '../middleware/image.middleware';

// route uploadImage này dùng để test up hình lên firebase thôi nha!!!
userRouter.post('/uploadImage', verifyToken, uploadMulter.single('file'), uploadImage);
userRouter.post('/signup', handleSignUp);
userRouter.post('/signin', handleSignIn);
userRouter.get('/all', verifyToken, handleGetUsers);
userRouter.get('/:id', verifyToken, handleGetUserById);
