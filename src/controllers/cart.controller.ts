import { NextFunction, Request, Response } from 'express';
import { CartModel } from '../models/cart.model';
import { CartService } from '../service/cart.service';

export const handleAddToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, userId, size, quantity } = req.body;
    const payload = {
      productId: Number(productId),
      userId: Number(userId),
      quantity: Number(quantity),
      size
    };
    const isProductExist = await CartService.checkIsProductInCart(Number(productId));
    if (isProductExist) {
      return res.status(400).json({ message: 'This product existed in cart!' });
    }
    await CartModel.create(payload);
    return res.status(201).json({ message: `Add productId: ${productId} to cart successfully` });
  } catch (error) {
    next(error);
  }
};

export const handleGetProductsInCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    // Each Product is an record and has an only cardId
    const productsInCart = await CartService.getProductsInCart(Number(userId));
    return res.status(200).json(productsInCart);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateCarts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, productId, size, quantity } = req.body;
    const payload = {
      userId: Number(userId),
      productId: Number(productId),
      quantity: Number(quantity),
      size
    };
    await CartModel.update(payload);
    return res.status(201).json({ message: `Update productId: ${productId} of userId: ${userId} successfully` });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProductInCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartId = Number(req.params.id);
    await CartModel.deleteById(cartId);
    return res.status(200).json({ message: `Delete cartId: ${cartId} successfully` });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteAllProductsInCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    await CartModel.deleteAll(Number(userId));
    return res.status(200).json({ message: `Delete all products in cart successfully` });
  } catch (error) {
    next(error);
  }
};
