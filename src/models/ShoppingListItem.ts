import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ShoppingListItemAttributes {
  id: number;
  shopping_list_id: number;
  product_id: number;
  quantity: number;
  price: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ShoppingListItemCreationAttributes extends Optional<ShoppingListItemAttributes, 'id' | 'price'> {}

class ShoppingListItem extends Model<ShoppingListItemAttributes, ShoppingListItemCreationAttributes> implements ShoppingListItemAttributes {
  public id!: number;
  public shopping_list_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ShoppingListItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shopping_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ShoppingListItem',
    tableName: 'shopping_list_items',
    timestamps: true,
  }
);

export default ShoppingListItem; 