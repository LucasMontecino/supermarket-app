import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './configs';

const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
