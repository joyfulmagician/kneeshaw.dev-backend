import { Document, model, Model, Schema } from "mongoose";

interface IJobDatabase {
  _id: string;
  name: string;
  description: string;
}

interface JobDatabaseDocument extends Document {
  _id: string;
  name: string;
  description: string;
}

const JobDatabaseSchema: Schema = new Schema(
  {
    name: {
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
    collection: "job_databases"
  }
);

const JobDatabase: Model<JobDatabaseDocument> = model<JobDatabaseDocument>(
  "JobDatabase",
  JobDatabaseSchema
);

export { IJobDatabase, JobDatabaseDocument, JobDatabase };
