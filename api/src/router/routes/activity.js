import express from "express";
import { weekly } from "#controllers/TaskController.js";
const router = express.Router();

router.get("/weekly", weekly);

export default router;
