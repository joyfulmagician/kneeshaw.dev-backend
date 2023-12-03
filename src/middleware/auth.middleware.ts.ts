import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { USER_STATUS } from "../utils/const.util";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user && req.user.status === USER_STATUS.ENABLED) {
    next();
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized user!" });
  }
}
