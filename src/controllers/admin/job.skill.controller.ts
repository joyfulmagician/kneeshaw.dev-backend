import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobSkill } from "../../models/job.skill.model";

/**
 * create a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createJobSkill(
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

  const existingSkill = await JobSkill.findOne({ name });
  if (existingSkill) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "A job skill with the same name already exists."
    });
  }

  const skill = {
    name,
    description
  };

  const skillCreated = await JobSkill.create(skill);

  return res.status(httpStatus.CREATED).json({ data: skillCreated });
}

/**
 * get all job skills
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllJobSkills(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const skills = await JobSkill.find().sort("name").exec();

  return res.status(httpStatus.OK).json({ data: skills });
}

/**
 * get a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getJobSkill(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const skill = await JobSkill.findOne({ _id: id });

  if (!skill) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Job Skill with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: skill });
}

/**
 * update a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateJobSkill(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { name, description } = req.body;

  const skill = await JobSkill.findOne({ _id: id });

  if (!skill) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Skill with id "${id}" not found.` });
  }

  if (!name || !description) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The name and description fields are required" });
  }

  const existingSkill = await JobSkill.findOne({ name, _id: { $ne: id } });
  if (existingSkill) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: "A job skill with the same name already exists."
    });
  }

  await JobSkill.updateOne({ _id: id }, { name, description });
  const skillUpdated = await JobSkill.findById(id, { name, description });

  return res.status(httpStatus.OK).json({ data: skillUpdated });
}

/**
 * delete a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteJobSkill(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  await JobSkill.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Job Skill deleted successfully." });
}

export default {
  createJobSkill,
  getAllJobSkills,
  getJobSkill,
  updateJobSkill,
  deleteJobSkill
};
