import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Document, model, Model, Schema } from "mongoose";

import defaultConfig from "../config/default.config";

interface IUser {
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  status: number;

  shipping: {
    firstName: string;
    lastName: string;
    card: string;
  };

  credit: {
    firstName: string;
    lastName: string;
    card: string;
  };

  comparePassword(password: string): boolean;
}

interface UserDocument extends Document {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  status: number;

  shipping: {
    firstName: string;
    lastName: string;
    card: string;
  };

  credit: {
    firstName: string;
    lastName: string;
    card: string;
  };
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    userName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true
    },

    shipping: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      card: {
        type: String,
        required: true
      }
    },

    credit: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      card: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

UserSchema.pre<UserDocument>(
  "save",
  function preSave(this: UserDocument, next) {
    if (!this.isModified("password")) {
      next();
    }

    const salt = genSaltSync(defaultConfig.bcrypt.salt);
    this.password = hashSync(this.password, salt);
    next();
  }
);

UserSchema.methods.comparePassword = function comparePassword(
  password: string
) {
  return compareSync(password, this.password);
};

const User: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export { IUser, UserDocument, User };
