import { Document, model, Model, Schema } from "mongoose";

interface IUser {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  status: number;
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

const User: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export { IUser, UserDocument, User };
