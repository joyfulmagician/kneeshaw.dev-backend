import express from "express";

import blogController from "../../controllers/admin/blog.controller";

const router = express.Router();

router.post("/", blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;
