import { Request, Response, NextFunction } from "express";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}
