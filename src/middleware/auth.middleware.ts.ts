import { Request, Response, NextFunction } from "express";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
}
