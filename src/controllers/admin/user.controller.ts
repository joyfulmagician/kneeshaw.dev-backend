import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { User } from "../../models/user.model";

/**
 * get all User
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllUsers(req: Request, res: Response, _next: NextFunction) {
  const users = await User.find().sort("userName").exec();

  return res.status(httpStatus.OK).json({ data: users });
}

/**
 * get a User
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getUser(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `User with id "${id}" not found.`
    });
  }
  console.log(user.email);
  return res.status(httpStatus.OK).json({ data: user });
}

/**
 * update a User
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateUser(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;
  const {
    email,
    userName,
    firstName,
    lastName,
    password,
    role,
    shipping,
    credit
  } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `User with id "${id}" not found.` });
  }

  if (!email || !userName || !firstName || !role) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message:
        "The email, userName, firstName, lastName and role fields are required"
    });
  }

  const existingUser = await User.findOne({ email, _id: { $ne: id } });
  if (existingUser) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "A User with the same email already exists."
    });
  }

  await User.updateOne(
    { _id: id },
    {
      email,
      userName,
      firstName,
      lastName,
      password,
      role,
      shipping,
      credit
    }
  );
  const userUpdated = await User.findById(id, {
    email,
    userName,
    firstName,
    lastName,
    password,
    role,
    shipping,
    credit
  });

  return res.status(httpStatus.OK).json({ data: userUpdated });
}

/**
 * delete a User
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteUser(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "User deleted successfully." });
}

export default {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
