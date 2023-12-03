import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Game } from "../../models/game.model";

/**
 * create a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function createGame(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { img, title, description, price } = req.body;

  if (!img || !title || !description || !price) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "The img, title, description and price fields are required."
    });
  }

  const game = {
    img,
    title,
    description,
    price
  };

  const GameCreated = await Game.create(game);

  return res.status(httpStatus.CREATED).json({ data: GameCreated });
}

/**
 * get all job skills
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function getAllGames(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const games = await Game.find().sort("title").exec();

  return res.status(httpStatus.OK).json({ data: games });
}

/**
 * get a job skill
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
 * update a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function updateGame(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { img, title, description, price } = req.body;

  const game = await Game.findOne({ _id: id });

  if (!game) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `Game with id "${id}" not found.` });
  }

  if (!img || !title || !description || !price) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "The image, title, description and price fields are required" });
  }

  await Game.updateOne({ _id: id }, { img, title, description, price });

  const gameUpdated = await Game.findById(id, { img, title, description, price });

  return res.status(httpStatus.OK).json({ data: gameUpdated });
}

/**
 * delete a job skill
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function deleteGame(
  req: Request,
  res: Response,
  _next: NextFunction
) {
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
