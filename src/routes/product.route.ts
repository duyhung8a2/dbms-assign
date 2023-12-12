import express from 'express';
import {
  handleDeleteAllProducts,
  handleDeleteProductById,
  handleGetAllProducts,
  handleGetProductById,
  handlePostProduct,
  handleUpdateProductById
} from '../controllers/product.controller';
import { verifyToken } from '../middleware/user.middleware';
export const productRouter = express.Router();
import { uploadMulter } from '../middleware/image.middleware';

productRouter.get('/:id', handleGetProductById);
productRouter.get('/', handleGetAllProducts);
productRouter.post('/', verifyToken, uploadMulter.single('file'), handlePostProduct);
productRouter.delete('/:id', verifyToken, handleDeleteProductById);
productRouter.delete('/', verifyToken, handleDeleteAllProducts);
productRouter.put('/:id', verifyToken, handleUpdateProductById);
