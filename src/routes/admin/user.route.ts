import express from "express";

import userController from "../../controllers/admin/user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
