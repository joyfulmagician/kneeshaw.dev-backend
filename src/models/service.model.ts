import { Document, model, Model, Schema } from "mongoose";

interface CService {
  _id: string;
  image: string;
  title: string;
  description: string;
}

interface ServiceDocument extends Document {
  _id: string;
  image: string;
  title: string;
  description: string;
}

const ServiceSchema: Schema = new Schema(
  {
    image: {
      type: String,
      required: true
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
    collection: "service"
  }
);

const Service: Model<ServiceDocument> = model<ServiceDocument>(
  "Service",
  ServiceSchema
);

export { CService, ServiceDocument, Service };
