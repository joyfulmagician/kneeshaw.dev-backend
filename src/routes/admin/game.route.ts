import express from "express";

import gameController from "../../controllers/admin/game.controller";

const router = express.Router();

router.post("/", gameController.createGame);
router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGame);
router.put("/:id", gameController.updateGame);
router.delete("/:id", gameController.deleteGame);

export default router;
