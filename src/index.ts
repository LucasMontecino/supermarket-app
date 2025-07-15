import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import './models';
import productRoutes from './routes/productRoutes';
import shoppingListRoutes from './routes/shoppingListRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/shopping-lists', shoppingListRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
}); 