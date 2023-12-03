import express from "express";

import jobBudgetController from "../../controllers/admin/job.budget.controller";

const router = express.Router();

router.post("/", jobBudgetController.createJobBudget);
router.get("/", jobBudgetController.getAllJobBudgets);
router.get("/:id", jobBudgetController.getJobBudget);
router.put("/:id", jobBudgetController.updateJobBudget);

export default router;
