import { readFileSync } from "fs";
import path from "path";

import { Game } from "../models/game.model";

export default async function seedGames() {
  await Game.deleteMany({});

  const games = [
    {
      image: {
        data: readFileSync(path.join("uploads", "game", "seed", "01.png")),
        contentType: "image/png"
      },
      title: "TItan Saga:Chains of Kronos",
      price: 123
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "game", "seed", "02.png")),
        contentType: "image/png"
      },
      title: "Old Salt",
      price: 123
    }
  ];

  await Game.insertMany(games);
}
