import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobService } from "../../models/job.service.model";

/**
 * create a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createJobService(
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

  const service = {
    name,
    description
  };

  const serviceCreated = await JobService.create(service);

  return res.status(httpStatus.CREATED).json({ data: serviceCreated });
}

/**
 * get all job services
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllJobServices(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const services = await JobService.find().sort("name").exec();

  return res.status(httpStatus.OK).json({ data: services });
}

async function getJobService(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const service = await JobService.findOne({ _id: id });

  if (!service) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Job Service with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: service });
}

/**
 * update a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateJobService(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { name, description } = req.body;

  const service = await JobService.findOne({ _id: id });

  if (!service) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Service with id "${id}" not found.` });
  }

  if (!name || !description) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The name and description fields are required" });
  }

  await JobService.updateOne({ _id: id }, { name, description });

  const serviceUpdated = await JobService.findById(id, { name, description });

  return res.status(httpStatus.OK).json({ data: serviceUpdated });
}

/**
 * delete a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteJobService(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  await JobService.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Job Service deleted successfully." });
}

export default {
  createJobService,
  getAllJobServices,
  getJobService,
  updateJobService,
  deleteJobService
};