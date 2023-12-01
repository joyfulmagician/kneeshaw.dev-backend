import { Request, Response, NextFunction } from "express";

import { User } from "../../models/user.model";

async function login(req: Request, _res: Response, _next: NextFunction) {
  const { email, password } = req.body;

  console.log("email: ", email);
  console.log("password: ", password);

  try {
    const user = await User.findOne({
      email,
      password
    });
    console.log("user: ", user);
  } catch (error) {
    console.error("admin auth.controller login error: ", error);
  }
}

export default { login };
