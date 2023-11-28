import express from "express";

import authRoutes from "./auth.routes";

const router = express.Router();

router.use("/api/admin/auth", authRoutes);

export default router;
