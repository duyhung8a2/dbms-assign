import { NextFunction, Request, Response } from 'express';
import { RatingService } from '../service/rating.service';

export const handleUserRatingProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.userRole !== 'customer') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const { productId, userId, star, comment } = req.body;
    await RatingService.post({
      productId: Number(productId),
      userId: Number(userId),
      star: Number(star),
      comment
    });
    return res.status(201).json({ message: 'Rating successfull' });
  } catch (error) {
    next(error);
  }
};

export const handleGetProductRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const productRating = await RatingService.getProductRating(Number(productId));
    return res.status(201).json(productRating);
  } catch (error) {
    next(error);
  }
};

export const handleGetUserRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const userRating = await RatingService.getUserRating(Number(userId));
    return res.status(201).json(userRating);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, userId, star, comment } = req.body;
    await RatingService.updateUserRating({
      productId: Number(productId),
      userId: Number(userId),
      star: Number(star),
      comment
    });

    return res.status(200).json({ message: 'Rating updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getAverageRatingProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = Number(req.params.id);
    const avgRating = await RatingService.getProductAverageRating(productId);
    return res.status(200).json({ averageRating: avgRating });
  } catch (error) {
    next(error);
  }
};
