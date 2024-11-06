import mongoose from "mongoose";
import config from "../../config/db.js";
import defaultUsers from "#data/users.js";
import UserModel from "#models/User.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const checkIfUserExists = async (email) => {
  let user = await UserModel.findOne({ email });
  return user !== null;
};

const run = async () => {
  try {
    // reset
    await UserModel.deleteMany();
    const users = defaultUsers.map((u) => ({
      ...u,
      avatar: faker.image.avatar()
    }));

    // generate users
    for (let index = 0; index < 25; index++) {
      let email;
      let exists = false;
      do {
        // generate new
        email = faker.internet.email();
        exists = await checkIfUserExists(email);
      } while (exists);

      const password = await bcrypt.hash("secret21", 10);

      const user = {
        name: faker.person.fullName(),
        email,
        avatar: faker.image.avatar(),
        password,
      };

      users.push(user);
    }
    // write fresh
    await UserModel.insertMany(users);
    console.log("Seeding completed");
    process.exit(0);
  } catch (error) {
    console.log("Error occurred when seeding users: ", error);
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
