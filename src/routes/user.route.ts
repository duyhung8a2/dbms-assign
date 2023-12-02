import express from 'express';
import { handleGetUserById, handleGetUsers, handleSignIn, handleSignUp } from '../controllers/user.controller';
import { verifyToken } from '../middleware/user.middleware';
export const userRouter = express.Router();

userRouter.get('/all', [verifyToken, handleGetUsers]);
userRouter.get('/:id', [verifyToken, handleGetUserById]);
userRouter.post('/signup', [handleSignUp]);
userRouter.post('/signin', [handleSignIn]);
