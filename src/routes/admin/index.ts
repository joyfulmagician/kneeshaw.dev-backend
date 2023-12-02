import express from "express";

import authRoutes from "./auth.route";
import jobSkillRoutes from "./job.skill.route";
import jobServiceRoutes from "./job.service.route";
import jobDatabaseRoutes from "./job.database.route";
import jobScopeRoutes from "./job.scope.route";
import jobPeriodRoutes from "./job.period.route";

import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/job/skill", adminMiddleware, jobSkillRoutes);
router.use("/job/service", adminMiddleware, jobServiceRoutes);
router.use("/job/database", adminMiddleware, jobDatabaseRoutes);
router.use("/job/scope", adminMiddleware, jobScopeRoutes);
router.use("/job/period", adminMiddleware, jobPeriodRoutes);

export default router;
