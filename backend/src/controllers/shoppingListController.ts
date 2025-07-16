import { NextFunction, Request, Response } from 'express';
import { ShoppingList, ShoppingListItem, Product } from '../models';
import {
  NewShoppingListSchema,
  UpdateShoppingListItemSchema,
} from '../schemas';

export const getAllShoppingLists = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lists = await ShoppingList.findAll({
      include: [{ model: ShoppingListItem, as: 'items', include: [Product] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(lists);
  } catch (error: unknown) {
    next(error);
  }
};

export const createShoppingList = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const list = await ShoppingList.create();
    res.status(201).json(list);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteShoppingList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const list = await ShoppingList.findByPk(id);
    if (!list) {
      res.status(404).json({ error: 'Shopping list not found' });
      return;
    }
    await list.destroy();
    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
};

export const addItemToList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { listId } = req.params;
    const { product_id, quantity, price } = NewShoppingListSchema.parse(
      req.body,
    );
    const item = await ShoppingListItem.create({
      shopping_list_id: Number(listId),
      product_id,
      quantity,
      price,
    });
    res.status(201).json(item);
    return;
  } catch (error: unknown) {
    next(error);
  }
};

export const updateItemInList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;
    const { quantity, price } = UpdateShoppingListItemSchema.parse(req.body);
    const item = await ShoppingListItem.findByPk(itemId);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    item.quantity = quantity ?? item.quantity;
    item.price = price ?? item.price;
    await item.save();
    res.json(item);
    return;
  } catch (error: unknown) {
    next(error);
  }
};

export const removeItemFromList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;
    const item = await ShoppingListItem.findByPk(itemId);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    await item.destroy();
    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
};
