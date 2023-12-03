import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IUser } from "../models/user.model";
import defaultConfig from "../config/default.config";

export default async function jwtVerifyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Kneeshaw"
  ) {
    const decodedUser = verify(
      req.headers.authorization.split(" ")[1],
      defaultConfig.jwt.secret
    );

    console.log("decodedUser: ", decodedUser);

    if (decodedUser) {
      req.user = decodedUser as IUser;
    } else {
      req.user = undefined;
    }

    next();
  } else {
    req.user = undefined;
    next();
  }
}
