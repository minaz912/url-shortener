import { NextFunction, Request, Response } from 'express';

export async function decode(req: Request, res: Response, next: NextFunction) {
  return res.json({ data: null });
}
