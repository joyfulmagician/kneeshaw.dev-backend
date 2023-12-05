import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import httpStatus from "http-status";

import { IUser, User, UserDocument } from "../../models/user.model";
import upload from "../../services/upload.service";

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
  upload("users").single("image")(req, res, async function error(err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while uploading avatar."
      });
    }

    const { id } = req.params;
    const {
      email,
      userName,
      firstName,
      lastName,
      password,
      role,
      shipping,
      credit,
      status
    } = req.body;

    if (!email || !userName || !firstName || !role) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message:
          "The email, userName, firstName, lastName and role fields are required"
      });
    }
    let user: Omit<IUser, "comparePassword"> = {
      email,
      userName,
      firstName,
      lastName,
      password,
      role,
      shipping,
      credit,
      status
    };

    if (req.file) {
      user = {
        ...user,
        image: {
          data: readFileSync(req.file?.path ?? ""),
          contentType: req.file?.mimetype
        }
      };
    }
    await User.updateOne({ _id: id }, user);
    const userUpdated = await User.findById(id);
    return res.status(httpStatus.OK).json({ data: userUpdated });
  });
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
