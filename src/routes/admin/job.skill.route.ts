import express from "express";

import jobSkillController from "../../controllers/admin/job.skill.controller";

const router = express.Router();

router.post("/", jobSkillController.createJobSkill);
router.get("/", jobSkillController.getAllJobSkills);
router.get("/:id", jobSkillController.getJobSkill);
router.put("/:id", jobSkillController.updateJobSkill);
router.delete("/:id", jobSkillController.deleteJobSkill);

export default router;
