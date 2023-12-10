import express from 'express';
import { userRouter } from './user.route';
import { productRouter } from './product.route';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);

export default router;
