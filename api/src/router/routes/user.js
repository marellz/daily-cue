import express from "express";
import { getProfile, updateProfile } from "#controllers/UserController.js";
import verifyToken from "#middleware/verify-token.js";

const router = express.Router();

router.put("/profile", verifyToken, updateProfile);
router.get("/profile/:id", getProfile);

export default router;
