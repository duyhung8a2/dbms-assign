import { NextFunction, Request, Response } from 'express';
// import { ProductModel } from '../models/user.model';
import { ProductService } from '../service/product.service';

export const handlePostProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.userRole !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const { name, description, sizes, imageLinks } = req.body;
    const image = req.file;
    await ProductService.create({
      name,
      description,
      sizes,
      image,
      imageLinks
    });
    res.status(200).json({ message: 'Create product successfully' });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await ProductService.getAllProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

export const handleGetProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.getProductById(Number(req.params.id));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.userRole !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await ProductService.deleteById(req.params.id);
    res.status(200).json({ message: 'Delete product successfully!' });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.userRole !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await ProductService.deleteAll();
    res.status(200).json({ message: 'Delete all products successfully!' });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.userRole !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const productId = Number(req.params.id);
    const { name, description, sizes, imageLinks } = req.body;
    const image = req.file;
    await ProductService.update({
      productId: Number(productId),
      name,
      description,
      sizes,
      image,
      imageLinks
    });
    res.status(200).json({ message: 'Update product successfully!' });
  } catch (error) {
    next(error);
  }
};
