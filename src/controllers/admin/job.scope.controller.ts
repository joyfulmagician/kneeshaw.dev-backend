import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobScope } from "../../models/job.scope.model";

/**
 * create a job scope
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createJobScope(
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

  const scope = {
    name,
    description
  };

  const scopeCreated = await JobScope.create(scope);

  return res.status(httpStatus.CREATED).json({ data: scopeCreated });
}

/**
 * get all job scopes
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllJobScopes(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const scopes = await JobScope.find().sort("name").exec();

  return res.status(httpStatus.OK).json({ data: scopes });
}

async function getJobScope(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const scope = await JobScope.findOne({ _id: id });

  if (!scope) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Job Scope with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: scope });
}

/**
 * update a job scope
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateJobScope(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { name, description } = req.body;

  const scope = await JobScope.findOne({ _id: id });

  if (!scope) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Scope with id "${id}" not found.` });
  }

  if (!name || !description) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The name and description fields are required" });
  }

  await JobScope.updateOne({ _id: id }, { name, description });

  const scopeUpdated = await JobScope.findById(id, { name, description });

  return res.status(httpStatus.OK).json({ data: scopeUpdated });
}

/**
 * delete a job scope
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteJobScope(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  await JobScope.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Job Scope deleted successfully." });
}

export default {
  createJobScope,
  getAllJobScopes,
  getJobScope,
  updateJobScope,
  deleteJobScope
};
