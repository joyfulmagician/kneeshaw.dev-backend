import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import httpStatus from "http-status";

import { IService, Service } from "../../models/service.model";
import upload from "../../services/upload.service";

/**
 * create a service
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createService(req: Request, res: Response, _next: NextFunction) {
  upload("services").single("image")(req, res, async function error(err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while uploading image."
      });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: "The title and description fields are required."
      });
    }

    const service = {
      image: {
        data: readFileSync(req.file?.path ?? ""),
        contentType: req.file?.mimetype
      },
      title,
      description
    };

    const serviceCreated = await Service.create(service);

    return res.status(httpStatus.CREATED).json({ data: serviceCreated });
  });
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
  upload("services").single("image")(req, res, async function error(err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while uploading image."
      });
    }

    const { id } = req.params;

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: "The title and description fields are required."
      });
    }

    let service: IService = {
      title,
      description
    };

    if (req.file) {
      service = {
        ...service,
        image: {
          data: readFileSync(req.file?.path ?? ""),
          contentType: req.file?.mimetype
        }
      };
    }

    await Service.updateOne({ _id: id }, service);

    const serviceUpdated = await Service.findById(id);

    return res.status(httpStatus.OK).json({ data: serviceUpdated });
  });
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
