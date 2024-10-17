// index.js
import express from 'express'
// const express = require("express");
import cors from 'cors'
// const cors = require("cors");
import dotenv from 'dotenv'
// const dotenv = require("dotenv");
import mongoose from 'mongoose'
// const mongoose = require("mongoose");
import config from './config.js'
const taskRoutes = require("./routes/");
const taskRoutes = require("./routes/tasks");

dotenv.config();

const app = express();
const PORT = config.port

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", homeRoute)
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
mongoose
  .connect(config.db_uri, config.db_options)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
