import express, { Request, Response } from 'express';
import { PORT } from './config/configs';
import cors from 'cors';
import sequelize from './config/database';
import './models';
import productRoutes from './routes/productRoutes';
import shoppingListRoutes from './routes/shoppingListRoutes';
import { errorHandler, unknownEndpoint } from './middlewares';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/shopping-lists', shoppingListRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
