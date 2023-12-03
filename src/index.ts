import config from "config";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

import jwtVerifyMiddleware from "./middleware/jwt.verify.middleware";
import connectDB from "./services/db.service";
import routes from "./routes";

dotenv.config();

const app: Application = express();

// Cors configuration
const corsOptions = {
  origin: config.get<string>("origin")
};
app.use(cors(corsOptions));

// Parse request of content type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use middleware
app.use(jwtVerifyMiddleware);

// Use routes
app.use(routes);

// Connect to database
connectDB()
  .then(() => {
    console.info("Database connected successfully.");

    const PORT = process.env.PORT || config.get<number>("port");
    app.listen(PORT, () => {
      console.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed. error: ", error);
    process.exit();
  });

// Error handler
process.on("unhandledRejection", (error) => {
  console.error("Unknown error occurred: ", error);
  process.exit(1);
});
