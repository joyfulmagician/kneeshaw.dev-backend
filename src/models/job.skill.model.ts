import { Document, model, Model, Schema } from "mongoose";

interface IJobSkill {
  _id: string;
  name: string;
  description: string;
}

interface JobSkillDocument extends Document {
  _id: string;
  name: string;
  description: string;
}

const JobSkillSchema: Schema = new Schema(
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
    collection: "job_skills"
  }
);

const JobSkill: Model<JobSkillDocument> = model<JobSkillDocument>(
  "JobSkill",
  JobSkillSchema
);

export { IJobSkill, JobSkillDocument, JobSkill };
