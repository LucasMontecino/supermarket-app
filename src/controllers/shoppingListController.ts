import { Request, Response } from 'express';
import { ShoppingList, ShoppingListItem, Product } from '../models';

export const getAllShoppingLists = async (_req: Request, res: Response) => {
  try {
    const lists = await ShoppingList.findAll({
      include: [{ model: ShoppingListItem, as: 'items', include: [Product] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shopping lists' });
  }
};

export const createShoppingList = async (_req: Request, res: Response) => {
  try {
    const list = await ShoppingList.create();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shopping list' });
  }
};

export const deleteShoppingList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = await ShoppingList.findByPk(id);
    if (!list) {
      res.status(404).json({ error: 'Shopping list not found' });
      return;
    }
    await list.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shopping list' });
  }
};

export const addItemToList = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const { product_id, quantity, price } = req.body;
    const item = await ShoppingListItem.create({
      shopping_list_id: Number(listId),
      product_id,
      quantity,
      price,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to list' });
  }
};

export const updateItemInList = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { quantity, price } = req.body;
    const item = await ShoppingListItem.findByPk(itemId);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    item.quantity = quantity ?? item.quantity;
    item.price = price ?? item.price;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const removeItemFromList = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const item = await ShoppingListItem.findByPk(itemId);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
}; 