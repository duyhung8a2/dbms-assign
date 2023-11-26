import express from 'express';
import { handleGetUsers } from '../controllers/user.controller';
export const userRouter = express.Router();

userRouter.get('/all', [handleGetUsers]);
