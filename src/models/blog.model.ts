import { Document, model, Model, Schema } from "mongoose";

interface IBlog {
  _id?: string;
  image?: {
    data: Buffer;
    contentType: string;
  };
  title: string;
  description: string;
}

interface BlogDocument extends Document {
  _id: string;
  image: {
    data: Buffer;
    contentType: string;
  };
  title: string;
  description: string;
}

const BlogSchema: Schema = new Schema(
  {
    image: {
      data: {
        type: Buffer
      },
      contentType: {
        type: String
      }
    },
    title: {
      type: String,
      required: true
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

const Blog: Model<BlogDocument> = model<BlogDocument>("Blog", BlogSchema);

export { IBlog, BlogDocument, Blog };
