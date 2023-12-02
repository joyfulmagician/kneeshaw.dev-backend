import express from "express";

import authRoutes from "./auth.route";
import jobSkillRoutes from "./job.skill.route";
import jobServiceRoutes from "./job.service.route";
import jobDatabaseRoutes from "./job.database.route";

import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/job/skill", adminMiddleware, jobSkillRoutes);
router.use("/job/service", adminMiddleware, jobServiceRoutes);
router.use("/job/database", adminMiddleware, jobDatabaseRoutes);

export default router;
