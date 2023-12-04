import { Document, model, Model, Schema } from "mongoose";

interface IJobBudget {
  _id: string;
  name: string;
  type: number;
  min: number;
  max: number;
}

interface JobBudgetDocument extends Document {
  _id: string;
  name: string;
  type: number;
  min: number;
  max: number;
}

const JobBudgetSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    type: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "job_budgets"
  }
);

const JobBudget: Model<JobBudgetDocument> = model<JobBudgetDocument>(
  "JobBudget",
  JobBudgetSchema
);

export { IJobBudget, JobBudgetDocument, JobBudget };
