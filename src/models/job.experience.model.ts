import { Document, model, Model, Schema } from "mongoose";

interface IJobExperience {
  _id: string;
  name: string;
  description: string;
}

interface JobExperienceDocument extends Document {
  _id: string;
  name: string;
  description: string;
}

const JobExperienceSchema: Schema = new Schema(
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
    collection: "job_experiences"
  }
);

const JobExperience: Model<JobExperienceDocument> =
  model<JobExperienceDocument>("JobExperience", JobExperienceSchema);

export { IJobExperience, JobExperienceDocument, JobExperience };
