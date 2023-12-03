import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Blog } from "../../models/blog.model";

/**
 * create a blog
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createBlog(req: Request, res: Response, _next: NextFunction) {
  const { img, title, description } = req.body;

  if (!img || !title || !description) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The img, title and description fields are required."
    });
  }

  const blog = {
    img,
    title,
    description
  };

  const blogCreated = await Blog.create(blog);

  return res.status(httpStatus.CREATED).json({ data: blogCreated });
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
  const { id } = req.params;
  const { img, title, description } = req.body;

  const blog = await Blog.findOne({ _id: id });

  if (!blog) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Blog with id "${id}" not found.` });
  }

  if (!img || !title || !description) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The image, title and description fields are required"
    });
  }

  await Blog.updateOne({ _id: id }, { img, title, description });

  const blogUpdated = await Blog.findById(id, {
    img,
    title,
    description
  });

  return res.status(httpStatus.OK).json({ data: blogUpdated });
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
