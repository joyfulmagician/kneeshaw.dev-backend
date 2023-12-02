import express from "express";

import authRoutes from "./auth.route";
import jobSkillRoutes from "./job.skill.route";

import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/job/skill", adminMiddleware, jobSkillRoutes);

export default router;
