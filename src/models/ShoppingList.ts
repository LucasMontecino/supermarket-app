import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ShoppingListAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ShoppingListCreationAttributes
  extends Optional<ShoppingListAttributes, 'id'> {}

class ShoppingList
  extends Model<ShoppingListAttributes, ShoppingListCreationAttributes>
  implements ShoppingListAttributes
{
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ShoppingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'ShoppingList',
    tableName: 'shopping_lists',
    timestamps: true,
  },
);

export default ShoppingList;
