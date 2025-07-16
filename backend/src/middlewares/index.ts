import { Request, Response } from 'express';

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'unknown endpoint' });
  return;
};

export const errorHandler = (error: unknown, _req: Request, res: Response) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
    return;
  } else {
    res.status(500).json({ error: 'unknown error' });
  }
};
