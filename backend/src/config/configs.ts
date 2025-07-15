import 'dotenv/config';

export const DATABASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

export const PORT = process.env.PORT || 3001;
