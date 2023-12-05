import { Document, model, Model, Schema } from "mongoose";

interface IService {
  _id?: string;
  image?: {
    data: Buffer;
    contentType: string;
  };
  title: string;
  description: string;
}

interface ServiceDocument extends Document {
  _id: string;
  image: {
    data: Buffer;
    contentType: string;
  };
  title: string;
  description: string;
}

const ServiceSchema: Schema = new Schema(
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
    collection: "services"
  }
);

const Service: Model<ServiceDocument> = model<ServiceDocument>(
  "Service",
  ServiceSchema
);

export { IService, ServiceDocument, Service };
