import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { USER_ROLES, USER_STATUS } from "../utils/const.util";

export default async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.user &&
    req.user.role === USER_ROLES.ADMIN &&
    req.user.status === USER_STATUS.ENABLED
  ) {
    next();
  } else {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized administrator." });
  }
}
