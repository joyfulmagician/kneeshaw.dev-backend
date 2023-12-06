import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import httpStatus from "http-status";

import { IBlog, Blog } from "../../models/blog.model";
import upload from "../../services/upload.service";

/**
 * create a blog
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createBlog(req: Request, res: Response, _next: NextFunction) {
  upload("blog").single("image")(req, res, async function error(err) {
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

    const blog = {
      image: {
        data: readFileSync(req.file?.path ?? ""),
        contentType: req.file?.mimetype
      },
      title,
      description
    };

    const blogCreated = await Blog.create(blog);

    return res.status(httpStatus.CREATED).json({ data: blogCreated });
  });
}

/**
 * get all blogs
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllBlogs(req: Request, res: Response, _next: NextFunction) {
  const blogs = await Blog.find().sort("title").exec();

  return res.status(httpStatus.OK).json({ data: blogs });
}

/**
 * get a blog
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getBlog(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const blog = await Blog.findOne({ _id: id });

  if (!blog) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Blog with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: blog });
}

/**
 * update a blog
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateBlog(req: Request, res: Response, _next: NextFunction) {
  upload("blog").single("image")(req, res, async function error(err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while uploading image."
      });
    }

    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: "The title and description fields are required"
      });
    }

    let blog: IBlog = {
      title,
      description
    };

    if (req.file) {
      blog = {
        ...blog,
        image: {
          data: readFileSync(req.file?.path ?? ""),
          contentType: req.file?.mimetype
        }
      };
    }

    await Blog.updateOne({ _id: id }, blog);

    const blogUpdated = await Blog.findById(id);

    return res.status(httpStatus.OK).json({ data: blogUpdated });
  });
}

/**
 * delete a blog
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteBlog(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  await Blog.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Blog deleted successfully." });
}

export default {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog
};
