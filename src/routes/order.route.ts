import express from 'express';
import { verifyToken } from '../middleware/user.middleware';
import { handleCreateOrder, handleGetAllOrderOfUser } from '../controllers/order.controller';

export const orderRouter = express.Router();

orderRouter.post('/', verifyToken, handleCreateOrder);
orderRouter.get('/:id', verifyToken, handleGetAllOrderOfUser);
