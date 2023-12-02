import express from "express";

import jobServiceController from "../../controllers/admin/job.service.controller";

const router = express.Router();

router.post("/", jobServiceController.createJobService);
router.get("/", jobServiceController.getAllJobServices);
router.get("/:id", jobServiceController.getJobService);
router.put("/:id", jobServiceController.updateJobService);
router.delete("/:id", jobServiceController.deleteJobService);

export default router;
