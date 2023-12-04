import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobExperience } from "../../models/job.experience.model";

/**
 * create a job experience
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createJobExperience(
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

  const existingExperience = await JobExperience.findOne({ name });
  if (existingExperience) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "A job experience with the same name already exists."
    });
  }

  const experience = {
    name,
    description
  };

  const experienceCreated = await JobExperience.create(experience);

  return res.status(httpStatus.CREATED).json({ data: experienceCreated });
}

/**
 * get all job experiences
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllJobExperiences(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const experiences = await JobExperience.find().sort("name").exec();

  return res.status(httpStatus.OK).json({ data: experiences });
}

/**
 * get a job experience
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getJobExperience(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  const experience = await JobExperience.findOne({ _id: id });

  if (!experience) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Job Experience with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: experience });
}

/**
 * update a job experience
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateJobExperience(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { name, description } = req.body;

  const experience = await JobExperience.findOne({ _id: id });

  if (!experience) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Experience with id "${id}" not found.` });
  }

  if (!name || !description) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The name and description fields are required" });
  }

  const existingExperience = await JobExperience.findOne({
    name,
    _id: { $ne: id }
  });
  if (existingExperience) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "A job experience with the same name already exists."
    });
  }

  await JobExperience.updateOne({ _id: id }, { name, description });

  const experienceUpdated = await JobExperience.findById(id, {
    name,
    description
  });

  return res.status(httpStatus.OK).json({ data: experienceUpdated });
}

/**
 * delete a job experience
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteJobExperience(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  await JobExperience.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Job Experience deleted successfully." });
}

export default {
  createJobExperience,
  getAllJobExperiences,
  getJobExperience,
  updateJobExperience,
  deleteJobExperience
};
