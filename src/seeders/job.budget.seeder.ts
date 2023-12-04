import { JOB_BUDGET_TYPE } from "../utils/const.util";
import { JobBudget } from "../models/job.budget.model";

export default async function seedJobBudgets() {
  await JobBudget.deleteMany({});

  const jobBudgets = [
    {
      name: "Hourly Rate",
      type: JOB_BUDGET_TYPE.RATE,
      min: 0,
      max: 100
    },
    {
      name: "Project Budget",
      type: JOB_BUDGET_TYPE.FIXED,
      min: 0,
      max: 100000
    }
  ];

  await JobBudget.insertMany(jobBudgets);
}
