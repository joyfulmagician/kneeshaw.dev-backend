import { Document, model, Model, Schema } from "mongoose";

interface IJobPeriod {
  _id: string;
  name: string;
  description: string;
  minTerm: number;
  maxTerm: number;
}

interface JobPeriodDocument extends Document {
  _id: string;
  name: string;
  description: string;
  minTerm: number;
  maxTerm: number;
}

const JobPeriodSchema: Schema = new Schema(
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
    },
    minTerm: {
      type: Number,
      required: true
    },
    maxTerm: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "job_periods"
  }
);

const JobPeriod: Model<JobPeriodDocument> = model<JobPeriodDocument>(
  "JobPeriod",
  JobPeriodSchema
);

export { IJobPeriod, JobPeriodDocument, JobPeriod };
