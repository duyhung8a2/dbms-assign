import express from 'express';
import { verifyToken } from '../middleware/user.middleware';
import {
  handleAddToCart,
  handleDeleteAllProductsInCart,
  handleDeleteProductInCart,
  handleGetProductsInCart,
  handleUpdateCarts
} from '../controllers/cart.controller';

export const cartRouter = express.Router();

cartRouter.post('/', verifyToken, handleAddToCart);
cartRouter.get('/:id', verifyToken, handleGetProductsInCart);
cartRouter.put('/', verifyToken, handleUpdateCarts);
cartRouter.delete('/delete', verifyToken, handleDeleteProductInCart);
cartRouter.delete('/deleteAll', verifyToken, handleDeleteAllProductsInCart);
