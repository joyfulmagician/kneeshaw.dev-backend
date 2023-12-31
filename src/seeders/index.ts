import dotenv from "dotenv";

import connectDB from "../services/db.service";
import seedUsers from "./user.seeder";
import seedJobBudgets from "./job.budget.seeder";
import seedServices from "./service.seeder";
import seedBlogs from "./blog.seeder";
import seedGames from "./game.seeder";

dotenv.config();

connectDB()
  .then(async () => {
    console.info("Database connected successfully.");

    await seedUsers();
    console.info("Users seeded successfully.");

    await seedJobBudgets();
    console.info("Job budgets seeded successfully.");

    await seedServices();
    console.info("Services seeded successfully.");

    await seedBlogs();
    console.info("Blogs seeded successfully.");

    await seedGames();
    console.info("Games seeded successfully.");

    process.exit();
  })
  .catch((error: Error) => {
    console.error("Database connection failed. error: ", error);
    process.exit();
  });
