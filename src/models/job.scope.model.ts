import { Document, model, Model, Schema } from "mongoose";

interface IJobScope {
  _id: string;
  name: string;
  description: string;
}

interface JobScopeDocument extends Document {
  _id: string;
  name: string;
  description: string;
}

const JobScopeSchema: Schema = new Schema(
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
    collection: "job_scopes"
  }
);

const JobScope: Model<JobScopeDocument> = model<JobScopeDocument>(
  "JobScope",
  JobScopeSchema
);

export { IJobScope, JobScopeDocument, JobScope };
