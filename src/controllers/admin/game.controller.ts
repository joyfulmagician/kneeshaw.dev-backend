import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import httpStatus from "http-status";

import { IGame, Game } from "../../models/game.model";
import upload from "../../services/upload.service";

/**
 * create a game
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createGame(req: Request, res: Response, _next: NextFunction) {
  upload("game").single("image")(req, res, async function error(err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while uploading image."
      });
    }
    const { title, price } = req.body;

    if (!title || !price) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: "The title and price fields are required."
      });
    }

    const game = {
      image: {
        data: readFileSync(req.file?.path ?? ""),
        contentType: req.file?.mimetype
      },
      title,
      price
    };

    const gameCreated = await Game.create(game);

    return res.status(httpStatus.CREATED).json({ data: gameCreated });
  });
}

/**
 * get all games
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllGames(req: Request, res: Response, _next: NextFunction) {
  const games = await Game.find().sort("title").exec();

  return res.status(httpStatus.OK).json({ data: games });
}

/**
 * get a game
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getGame(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  const game = await Game.findOne({ _id: id });

  if (!game) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `Game with id "${id}" not found.`
    });
  }

  return res.status(httpStatus.OK).json({ data: game });
}

/**
 * update a game
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateGame(req: Request, res: Response, _next: NextFunction) {
  upload("game").single("image")(req, res, async function error(err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while uploading image."
      });
    }

    const { id } = req.params;
    const { title, price } = req.body;

    if (!title || !price) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        message: "The title and price fields are required"
      });
    }

    let game: IGame = {
      title,
      price
    };

    if (req.file) {
      game = {
        ...game,
        image: {
          data: readFileSync(req.file?.path ?? ""),
          contentType: req.file?.mimetype
        }
      };
    }

    await Game.updateOne({ _id: id }, game);

    const gameUpdated = await Game.findById(id);

    return res.status(httpStatus.OK).json({ data: gameUpdated });
  });
}

/**
 * delete a game
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteGame(req: Request, res: Response, _next: NextFunction) {
  const { id } = req.params;

  await Game.findByIdAndDelete(id);

  return res
    .status(httpStatus.OK)
    .json({ message: "Game deleted successfully." });
}

export default {
  createGame,
  getAllGames,
  getGame,
  updateGame,
  deleteGame
};
