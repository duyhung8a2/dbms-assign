import express from 'express';
import { userRouter } from './user.route';
import { productRouter } from './product.route';
import { ratingRouter } from './rating.route';
import { cartRouter } from './cart.route';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/rating', ratingRouter);
router.use('/cart', cartRouter);

export default router;
