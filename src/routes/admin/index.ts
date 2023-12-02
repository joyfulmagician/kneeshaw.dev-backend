import express from "express";

import authRoutes from "./auth.route";
import jobRoutes from "./job.route";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/job", adminMiddleware, jobRoutes);

export default router;
