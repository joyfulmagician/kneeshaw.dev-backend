import express from "express";

import jobPeriodController from "../../controllers/admin/job.period.controller";

const router = express.Router();

router.post("/", jobPeriodController.createJobPeriod);
router.get("/", jobPeriodController.getAllJobPeriods);
router.get("/:id", jobPeriodController.getJobPeriod);
router.put("/:id", jobPeriodController.updateJobPeriod);
router.delete("/:id", jobPeriodController.deleteJobPeriod);

export default router;
