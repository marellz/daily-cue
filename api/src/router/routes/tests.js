import express from "express";
import UserModel from "#models/User.js";
const router = express.Router();

router.get("/test-user", async (req, res) => {
  try {
    const [user] = await UserModel.aggregate([{ $sample: { size: 1 } }]);
    return res.json({ user: { email: user.email, password: "secret21" } });
  } catch ({ message }) {
    return res
      .status(500)
      .json({ error: "Error getting random user", message });
  }
});

export default router;
