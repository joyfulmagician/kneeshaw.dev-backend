import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Service } from "../../models/service.model";

/**
 * create a service
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createService(req: Request, res: Response, _next: NextFunction) {
  const { image, title, description } = req.body;

  if (!image || !title || !description) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The image, title and description fields are required."
    });
  }

  const service = {
    image,
    title,
    description
  };

  const serviceCreated = await Service.create(service);

  return res.status(httpStatus.CREATED).json({ data: serviceCreated });
}

/**
 * get all services
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllServices(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const services = await Service.find().sort("title").exec();

  return res.status(httpStatus.OK).json({ data: services });
}

/**
 * get a service
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getService(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const service = await Service.findOne({ _id: id });

  if (!service) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Service with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: service });
}

/**
 * update a service
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateService(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;
  const { image, title, description } = req.body;

  const service = await Service.findOne({ _id: id });

  if (!service) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Service with id "${id}" not found.` });
  }

  if (!image || !title || !description) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The image, title and description fields are required"
    });
  }

  await Service.updateOne({ _id: id }, { image, title, description });

  const serviceUpdated = await Service.findById(id, {
    image,
    title,
    description
  });

  return res.status(httpStatus.OK).json({ data: serviceUpdated });
}

/**
 * delete a service
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteService(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  await Service.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Service deleted successfully." });
}

export default {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService
};
