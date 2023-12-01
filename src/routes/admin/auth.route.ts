import express from "express";
import authController from "../../controllers/admin/auth.controller";

const router = express.Router();

router.get("/", authController.getHello);

export default router;
