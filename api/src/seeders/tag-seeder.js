import mongoose from "mongoose";
import config from "../../config/db.js";
import dotenv from "dotenv";
import User from "#models/User.js";
import TagModel from "#models/Tag.js";
import { tags } from "#data/tags.js";
import _ from "lodash";
dotenv.config();

const run = async () => {
  try {
    await TagModel.deleteMany()
    
    const users = await User.find();


    let data = []

    users.forEach(async (user) => {
      data = [...data, ...tags.map((t) => ({ ...t, user: user.id }))];
    });
    
    await TagModel.insertMany(data)

    console.log("Seeding tags completed");
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
