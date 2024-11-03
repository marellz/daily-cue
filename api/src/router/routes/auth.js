import express from "express";
import {
  user,
  login,
  register,
  logout,
  recoverPassword,
  resetPassword,
} from "#controllers/AuthController.js";

import verifyToken from "#middleware/verify-token.js";

const router = express.Router();

router.post("/me", [verifyToken], user);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", [verifyToken], logout); // needs token
router.post("/recover-password", recoverPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
