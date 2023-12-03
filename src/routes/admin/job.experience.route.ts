import express from "express";

import jobExperienceController from "../../controllers/admin/job.experience.controller";

const router = express.Router();

router.post("/", jobExperienceController.createJobExperience);
router.get("/", jobExperienceController.getAllJobExperiences);
router.get("/:id", jobExperienceController.getJobExperience);
router.put("/:id", jobExperienceController.updateJobExperience);
router.delete("/:id", jobExperienceController.deleteJobExperience);

export default router;
