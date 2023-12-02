import { Request, Response, NextFunction } from "express";

import { IUser, User } from "../../models/user.model";

async function login(req: Request, _res: Response, _next: NextFunction) {
  const { email, password } = req.body;

  console.log("email: ", email);
  console.log("password: ", password);

  try {
    const user: IUser = await User.findOne({ email }).select("+password");
    if (user && user.comparePassword(password)) {
      console.log("user: ", user);
    }
  } catch (error) {
    console.error("admin auth.controller login error: ", error);
  }
}

export default { login };
