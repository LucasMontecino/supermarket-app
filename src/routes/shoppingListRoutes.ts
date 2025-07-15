import { Router } from 'express';
import * as shoppingListController from '../controllers/shoppingListController';

const router = Router();

router.get('/', shoppingListController.getAllShoppingLists);
router.post('/', shoppingListController.createShoppingList);
router.delete('/:id', shoppingListController.deleteShoppingList);

// Shopping list items
router.post('/:listId/items', shoppingListController.addItemToList);
router.put('/:listId/items/:itemId', shoppingListController.updateItemInList);
router.delete(
  '/:listId/items/:itemId',
  shoppingListController.removeItemFromList,
);

export default router;
