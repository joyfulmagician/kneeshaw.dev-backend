import express from "express";

import serviceController from "../../controllers/admin/service.controller";

const router = express.Router();

router.post("/", serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

export default router;
