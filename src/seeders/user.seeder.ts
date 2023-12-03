import { genSaltSync, hashSync } from "bcryptjs";
import config from "config";

import { USER_ROLES, USER_STATUS } from "../utils/const.util";
import { User } from "../models/user.model";

export default async function seedUsers() {
  const salt = genSaltSync(
    Number(process.env.BCRYPT_SALT) ?? config.get<number>("bcrypt.salt")
  );

  await User.deleteMany({});

  const adminUsers = [
    {
      email: "michael@kneeshaw.dev",
      userName: "MichaelKneeshaw",
      firstName: "Michael",
      lastName: "Kneeshaw",
      password: hashSync("michael", salt),
      role: USER_ROLES.ADMIN,
      status: USER_STATUS.ENABLED
    }
  ];

  await User.insertMany(adminUsers);
}
