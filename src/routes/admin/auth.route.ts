import express from "express";

import authController from "../../controllers/admin/auth.controller";

const router = express.Router();

router.route("/login").post(authController.login);

export default router;
