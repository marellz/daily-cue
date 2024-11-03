// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "../config/db.js";
import bodyParser from "body-parser";

// router
import routes from "#router/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
routes.forEach(({ path, actions }) => {
  app.use(path, actions);
});

// Connect to MongoDB
mongoose
  .connect(config.db_uri, config.db_options)
  .then(() => console.log("MongoDB Connected."))
  .catch((error) =>
    console.error({ message: "MongoDB did not connect.", error })
  );

// Start Server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
