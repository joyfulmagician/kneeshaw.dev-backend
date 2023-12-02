import { Document, model, Model, Schema } from "mongoose";

interface IJobService {
  _id: string;
  name: string;
  description: string;
}

interface JobServiceDocument extends Document {
  _id: string;
  name: string;
  description: string;
}

const JobServiceSchema: Schema = new Schema(
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
    collection: "job_services"
  }
);

const JobService: Model<JobServiceDocument> = model<JobServiceDocument>(
  "JobService",
  JobServiceSchema
);

export { IJobService, JobServiceDocument, JobService };
