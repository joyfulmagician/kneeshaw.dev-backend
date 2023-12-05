import express from "express";

import jobBudgetController from "../../controllers/admin/job.budget.controller";

const router = express.Router();

router.get("/", jobBudgetController.getJobBudgetByType);
router.get("/:id", jobBudgetController.getJobBudget);
router.put("/:id", jobBudgetController.updateJobBudget);

export default router;
