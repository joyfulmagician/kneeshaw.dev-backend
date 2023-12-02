import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { verify } from "jsonwebtoken";

// import { USER_ROLES } from "../utils/const.util";
// import { IUser } from "../models/user.model";

export default async function adminMiddleware(
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
      process.env.JWT_SECRET ?? ""
    );

    console.log("decodedUser: ", decodedUser);
    // if (decodedUser.role === USER_ROLES.ADMIN && decodedUser.)

    next();
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized user." });
  }
}
