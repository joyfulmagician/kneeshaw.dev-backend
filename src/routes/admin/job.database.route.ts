import express from "express";

import jobDatabaseController from "../../controllers/admin/job.database.controller";

const router = express.Router();

router.post("/", jobDatabaseController.createJobDatabase);
router.get("/", jobDatabaseController.getAllJobDatabases);
router.get("/:id", jobDatabaseController.getJobDatabase);
router.put("/:id", jobDatabaseController.updateJobDatabase);
router.delete("/:id", jobDatabaseController.deleteJobDatabase);

export default router;
