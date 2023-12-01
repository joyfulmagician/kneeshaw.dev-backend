import { Request, Response, NextFunction } from "express";

export default async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}
