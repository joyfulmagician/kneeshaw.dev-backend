import express from "express";

import authRoutes from "./auth.route";
import gameRoutes from "./game.route";
import blogRoutes from "./blog.route";
import jobSkillRoutes from "./job.skill.route";
import jobServiceRoutes from "./job.service.route";
import jobDatabaseRoutes from "./job.database.route";
import jobScopeRoutes from "./job.scope.route";
import jobPeriodRoutes from "./job.period.route";
import jobExperienceRoutes from "./job.experience.route";
import jobBudgetRoutes from "./job.budget.route";

import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/game", adminMiddleware, gameRoutes);
router.use("/blog", adminMiddleware, blogRoutes);

router.use("/job/skill", adminMiddleware, jobSkillRoutes);
router.use("/job/service", adminMiddleware, jobServiceRoutes);
router.use("/job/database", adminMiddleware, jobDatabaseRoutes);
router.use("/job/scope", adminMiddleware, jobScopeRoutes);
router.use("/job/period", adminMiddleware, jobPeriodRoutes);
router.use("/job/experience", adminMiddleware, jobExperienceRoutes);
router.use("/job/budget", adminMiddleware, jobBudgetRoutes);

export default router;
