import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobPeriod } from "../../models/job.period.model";

/**
 * create a job period
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createJobPeriod(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { name, description, minTerm, maxTerm } = req.body;

  if (!name || !description || minTerm < 0 || maxTerm < 0) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The name, description, min, and max term fields are required."
    });
  }

  const existingPeriod = await JobPeriod.findOne({ name });
  if (existingPeriod) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "A job period with the same name already exists."
    });
  }

  const period = {
    name,
    description,
    minTerm,
    maxTerm
  };

  const periodCreated = await JobPeriod.create(period);

  return res.status(httpStatus.CREATED).json({ data: periodCreated });
}

/**
 * get all job periods
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllJobPeriods(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const periods = await JobPeriod.find().sort("name").exec();

  return res.status(httpStatus.OK).json({ data: periods });
}

/**
 * get a job period
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getJobPeriod(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const period = await JobPeriod.findOne({ _id: id });

  if (!period) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Job Period with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: period });
}

/**
 * update a job period
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateJobPeriod(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { name, description, minTerm, maxTerm } = req.body;

  const period = await JobPeriod.findOne({ _id: id });

  if (!period) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Period with id "${id}" not found.` });
  }

  if (!name || !description || minTerm < 0 || maxTerm < 0) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The name, description, min, and max term fields are required"
    });
  }

  const existingPeriod = await JobPeriod.findOne({ name, _id: { $ne: id } });
  if (existingPeriod) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "A job period with the same name already exists."
    });
  }

  await JobPeriod.updateOne({ _id: id }, { name, description });

  const periodUpdated = await JobPeriod.findById(id, {
    name,
    description,
    minTerm,
    maxTerm
  });

  return res.status(httpStatus.OK).json({ data: periodUpdated });
}

/**
 * delete a job period
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteJobPeriod(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  await JobPeriod.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Job Period deleted successfully." });
}

export default {
  createJobPeriod,
  getAllJobPeriods,
  getJobPeriod,
  updateJobPeriod,
  deleteJobPeriod
};
