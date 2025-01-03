import mongoose from "mongoose";
import config from "../../config/db.js";
import { tasks as taskSeeder } from "#data/tasks.js";
import TaskModel from "#models/Task.js";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const tasks = await taskSeeder();
  try {
    // reset
    await TaskModel.deleteMany();
    // write fresh
    await TaskModel.insertMany(tasks);
    console.log("Seeding tasks completed");
    process.exit(0);
  } catch (error) {
    console.log("Error occurred when seeding tasks: ", error);
    process.exit(1);
  }
};

mongoose
  .connect(config.db_uri, config.db_options)
  .then(() => console.log("MongoDB Connected."))
  .then(run)
  .catch((error) =>
    console.error({ message: "MongoDB did not connect.", error })
  );
