import express from "express";

import jobController from "../../controllers/admin/job.controller";

const router = express.Router();

router.route("/hello").post(jobController.hello);

export default router;
