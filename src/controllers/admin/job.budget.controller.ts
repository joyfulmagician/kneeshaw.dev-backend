import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobBudget } from "../../models/job.budget.model";

/**
 * create a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createJobBudget(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { name, type, min, max } = req.body;

  if (!name || !type || !min || !max) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The all fields are required."
    });
  }

  const budget = {
    name,
    type,
    min,
    max
  };

  const budgetCreated = await JobBudget.create(budget);

  return res.status(httpStatus.CREATED).json({ data: budgetCreated });
}

/**
 * get all job budgets
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllJobBudgets(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const budgets = await JobBudget.find().sort("type").exec();

  return res.status(httpStatus.OK).json({ data: budgets });
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
  const { name, type, min, max } = req.body;

  const budget = await JobBudget.findOne({ _id: id });

  if (!budget) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Budget with id "${id}" not found.` });
  }

  if (!name || !type || !min || max) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The all fields are required" });
  }

  await JobBudget.updateOne({ _id: id }, { name, type, min, max });

  const budgetUpdated = await JobBudget.findById(id, { name, type, min, max });

  return res.status(httpStatus.OK).json({ data: budgetUpdated });
}

/**
 * delete a job budget
 *
//  * @param req
//  * @param res
//  * @param _next
//  * @returns
//  */
// async function deleteJobBudget(
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ) {
//   const { id } = req.params;

//   await JobBudget.findByIdAndDelete(id);

//   return res
//     .status(httpStatus.OK)
//     .json({ message: "Job Budget deleted successfully." });
// }

export default {
  createJobBudget,
  getAllJobBudgets,
  getJobBudget,
  updateJobBudget
  // deleteJobBudget
};
