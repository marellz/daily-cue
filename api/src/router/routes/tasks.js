import express from "express";
import {
  index,
  get,
  store,
  update,
  destroy,
  intercept,
} from "#controllers/TaskController.js";

const router = express.Router();

router.route("/").get(index).post(store);
router.route("/:id").get(get).put(update).delete(destroy);
router.param('id', intercept)

export default router;
