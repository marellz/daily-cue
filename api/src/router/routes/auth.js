import express from "express";
import {
  user,
  login,
  register,
  logout,
  recoverPassword,
  resetPassword,
  updatePassword,
} from "#controllers/AuthController.js";

import verifyToken from "#middleware/verify-token.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/recover-password", recoverPassword);
router.post("/reset-password/:token", resetPassword);

// needs token
router.put("/password", verifyToken, updatePassword);


router.get("/me", [verifyToken], user);
router.post("/logout", [verifyToken], logout);

export default router;
