import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobDatabase } from "../../models/job.database.model";

/**
 * create a job database
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createJobDatabase(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The name and description fields are required."
    });
  }

  const database = {
    name,
    description
  };

  const databaseCreated = await JobDatabase.create(database);

  return res.status(httpStatus.CREATED).json({ data: databaseCreated });
}

/**
 * get all job databases
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllJobDatabases(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const databases = await JobDatabase.find().sort("name").exec();

  return res.status(httpStatus.OK).json({ data: databases });
}

/**
 * get a job database
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getJobDatabase(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  const database = await JobDatabase.findOne({ _id: id });

  if (!database) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Job Database with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: database });
}

/**
 * update a job database
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateJobDatabase(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { name, description } = req.body;

  const database = await JobDatabase.findOne({ _id: id });

  if (!database) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Database with id "${id}" not found.` });
  }

  if (!name || !description) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The name and description fields are required" });
  }

  await JobDatabase.updateOne({ _id: id }, { name, description });

  const databaseUpdated = await JobDatabase.findById(id, { name, description });

  return res.status(httpStatus.OK).json({ data: databaseUpdated });
}

/**
 * delete a job database
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteJobDatabase(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  await JobDatabase.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Job Database deleted successfully." });
}

export default {
  createJobDatabase,
  getAllJobDatabases,
  getJobDatabase,
  updateJobDatabase,
  deleteJobDatabase
};
