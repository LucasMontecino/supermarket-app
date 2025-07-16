import { NextFunction, Request, Response } from 'express';
import { Product } from '../models';
import { NewProductSchema, UpdateProductSchema } from '../schemas';

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.findAll();
    res.json(products);
    return;
  } catch (error: unknown) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newProduct = NewProductSchema.parse(req.body);
    const product = await Product.create(newProduct);
    res.status(201).json(product);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updatedProduct = UpdateProductSchema.parse(req.body);
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    product.name = updatedProduct.name ?? product.name;
    product.last_price = updatedProduct.last_price ?? product.last_price;
    await product.save();
    res.json(product);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    await product.destroy();
    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
};
