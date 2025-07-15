import Product from './Product';
import ShoppingList from './ShoppingList';
import ShoppingListItem from './ShoppingListItem';

// Associations
ShoppingList.hasMany(ShoppingListItem, { foreignKey: 'shopping_list_id', as: 'items' });
ShoppingListItem.belongsTo(ShoppingList, { foreignKey: 'shopping_list_id' });

Product.hasMany(ShoppingListItem, { foreignKey: 'product_id', as: 'shoppingListItems' });
ShoppingListItem.belongsTo(Product, { foreignKey: 'product_id' });

export { Product, ShoppingList, ShoppingListItem }; 