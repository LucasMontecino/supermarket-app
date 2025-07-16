import { z } from 'zod';

const NewProductSchema = z.object({
  name: z.string().min(1),
  last_price: z.number().min(0),
});

const UpdateProductSchema = z.object({
  name: z.string().min(1).optional(),
  last_price: z.number().min(0).optional(),
});

const NewShoppingListSchema = z.object({
  product_id: z.number().min(1),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

const UpdateShoppingListItemSchema = z.object({
  quantity: z.number().min(1).optional(),
  price: z.number().min(0).optional(),
});

export {
  NewProductSchema,
  UpdateProductSchema,
  NewShoppingListSchema,
  UpdateShoppingListItemSchema,
};
