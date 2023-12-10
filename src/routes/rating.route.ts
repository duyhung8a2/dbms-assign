import express from 'express';
import { verifyToken } from '../middleware/user.middleware';
import {
  handleGetProductRating,
  handleGetUserRating,
  handleUpdateUserRating,
  handleUserRatingProduct
} from '../controllers/rating.controller';
export const ratingRouter = express.Router();

ratingRouter.post('/', verifyToken, handleUserRatingProduct);
ratingRouter.get('/product/:id', verifyToken, handleGetProductRating);
ratingRouter.get('/user/:id', verifyToken, handleGetUserRating);
ratingRouter.put('/', handleUpdateUserRating);
