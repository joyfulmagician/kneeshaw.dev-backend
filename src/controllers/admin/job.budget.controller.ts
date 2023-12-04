import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobBudget } from "../../models/job.budget.model";

/**
 * get a job budget by type
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getJobBudgetByType(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { type } = req.query;

  const budget = await JobBudget.findOne({ type });

  return res.status(httpStatus.OK).json({ data: budget });
}

/**
 * get a job budget
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getJobBudget(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const budget = await JobBudget.findOne({ _id: id });

  if (!budget) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Job Budget with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: budget });
}

/**
 * update a job budget
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateJobBudget(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { min, max } = req.body;

  const budget = await JobBudget.findOne({ _id: id });

  if (!budget) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Budget with id "${id}" not found.` });
  }

  if (!min || !max) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The min and max fields are required" });
  }

  await JobBudget.updateOne({ _id: id }, { min, max });

  const budgetUpdated = await JobBudget.findById(id);

  return res.status(httpStatus.OK).json({ data: budgetUpdated });
}

export default {
  getJobBudgetByType,
  getJobBudget,
  updateJobBudget
};
