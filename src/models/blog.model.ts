import { Document, model, Model, Schema } from "mongoose";

interface IBlog {
  _id: string;
  img: string;
  title: string;
  description: string;
}

interface BlogDocument extends Document {
  _id: string;
  img: string;
  title: string;
  description: string;
}

const blogSchema: Schema = new Schema(
  {
    img: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "blogs"
  }
);

const Blog: Model<BlogDocument> = model<BlogDocument>("Blog", blogSchema);

export { IBlog, BlogDocument, Blog };
