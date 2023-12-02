import { Document, model, Model, Schema } from "mongoose";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

interface IUser {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  status: number;

  comparePassword(password: string): boolean;
}

interface UserDocument extends Document {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  status: number;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
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

    const salt = genSaltSync(Number(process.env.BCRYPT_SALT) ?? 10);
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
