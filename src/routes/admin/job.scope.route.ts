import express from "express";

import jobScopeController from "../../controllers/admin/job.scope.controller";

const router = express.Router();

router.post("/", jobScopeController.createJobScope);
router.get("/", jobScopeController.getAllJobScopes);
router.get("/:id", jobScopeController.getJobScope);
router.put("/:id", jobScopeController.updateJobScope);
router.delete("/:id", jobScopeController.deleteJobScope);

export default router;
