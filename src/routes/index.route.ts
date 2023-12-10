import express from 'express';
import { userRouter } from './user.route';
import { productRouter } from './product.route';
import { ratingRouter } from './rating.route';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/rating', ratingRouter);

export default router;
