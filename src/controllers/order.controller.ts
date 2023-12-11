import { NextFunction, Request, Response } from 'express';
import { OrderService } from '../service/order.service';

export const handleCreateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, phone, note, address } = req.body;
    await OrderService.createOrder({
      userId,
      phone,
      note,
      address
    });
    return res.status(201).json({ message: 'Create order successfully' });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllOrderOfUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);
    const orders = await OrderService.getAllOrder(userId);
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
