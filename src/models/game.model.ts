import { Document, model, Model, Schema } from "mongoose";

interface IGame {
  _id: string;
  img: string;
  title: string;
  description: string;
  price: number;
}

interface GameDocument extends Document {
  _id: string;
  img: string;
  title: string;
  description: string;
  price: number;
}

const gameSchema: Schema = new Schema(
  {
    img: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "games"
  }
);

const Game: Model<GameDocument> = model<GameDocument>("Game", gameSchema);

export { IGame, GameDocument, Game };
