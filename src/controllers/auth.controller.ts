import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { sign } from "jsonwebtoken";

import { IUser, User } from "../models/user.model";
import { USER_ROLES } from "../utils/const.util";
import defaultConfig from "../config/default.config";

/**
 * Login a user
 *
 * @param req
 * @param res
 * @param _next
 */
async function login(req: Request, res: Response, _next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user: IUser = await User.findOne({ email }).select("+password");

    if (
      user &&
      user.role === USER_ROLES.ADMIN &&
      user.comparePassword(password)
    ) {
      res.status(httpStatus.OK).json({
        token: sign(
          {
            _id: user._id,
            email: user.email,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status
          },
          defaultConfig.jwt.secret
        )
      });
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Authentication failed." });
    }
  } catch (error) {
    console.error("admin auth.controller login error: ", error);
  }
}

/**
 * Register a user
 *
 * @param req
 * @param res
 * @param _next
 */
async function register(req: Request, res: Response, _next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user: IUser = await User.findOne({ email }).select("+password");

    if (
      user &&
      user.role === USER_ROLES.USER &&
      user.comparePassword(password)
    ) {
      res.status(httpStatus.OK).json({
        token: sign(
          {
            _id: user._id,
            email: user.email,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status
          },
          defaultConfig.jwt.secret
        )
      });
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Authentication failed." });
    }
  } catch (error) {
    console.error("admin auth.controller login error: ", error);
  }
}

export default { login, register };
