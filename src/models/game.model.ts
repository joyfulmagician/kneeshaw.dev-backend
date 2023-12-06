import { Document, model, Model, Schema } from "mongoose";

interface IGame {
  _id?: string;
  image?: {
    data: Buffer;
    contentType: string;
  };
  title: string;
  price: number;
}

interface GameDocument extends Document {
  _id: string;
  image: {
    data: Buffer;
    contentType: string;
  };
  title: string;
  price: number;
}

const gameSchema: Schema = new Schema(
  {
    image: {
      data: {
        type: Buffer
      },
      contentType: {
        type: String
      }
    },
    title: {
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
