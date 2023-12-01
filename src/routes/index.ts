import express from "express";

import authRoutes from "./auth.route";

import adminRoutes from "./admin";

const router = express.Router();

router.use("/api/auth", authRoutes);

router.use("/api/admin", adminRoutes);

export default router;
