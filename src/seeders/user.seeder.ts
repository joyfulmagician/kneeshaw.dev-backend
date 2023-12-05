import { genSaltSync, hashSync } from "bcryptjs";
import { readFileSync } from "fs";
import path from "path";

import { USER_ROLES, USER_STATUS } from "../utils/const.util";
import { User } from "../models/user.model";
import defaultConfig from "../config/default.config";

export default async function seedUsers() {
  const salt = genSaltSync(defaultConfig.bcrypt.salt);

  await User.deleteMany({});

  const adminUsers = [
    {
      image: {
        data: readFileSync(path.join("uploads", "users", "seed", "01.png")),
        contentType: "image/png"
      },
      email: "michael@kneeshaw.dev",
      userName: "MichaelKneeshaw",
      firstName: "Michael",
      lastName: "Kneeshaw",
      password: hashSync("michael", salt),
      role: USER_ROLES.ADMIN,
      status: USER_STATUS.ENABLED,
      shipping: {
        firstName: "test",
        lastName: "test",
        card: "test"
      },
      credit: {
        firstName: "test",
        lastName: "test",
        card: "test"
      }
    }
  ];

  await User.insertMany(adminUsers);
}
