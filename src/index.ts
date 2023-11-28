import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

import routes from "./routes";
import connectDB from "./services/db.service";

dotenv.config();

const app: Application = express();

// Cors configuration
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

// Parse request of content type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use(routes);

// Connect to database
connectDB()
  .then(() => {
    console.info("Database connected successfully.");

    const PORT = process.env.PORT || 5000;
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
