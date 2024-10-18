import express from "express";
import Task from "../../models/Task.js";
import {
  index,
  get,
  store,
  update,
  destroy,
} from "../../controllers/TaskController.js";
const router = express.Router();

router.get("/", index);
router.post("/", store);
router.route("/:id").get(get).put(update).delete(destroy);

router.param("id", async (req, res, next, id) => {
  try {
    const task = await Task.findById(id);
    if (task) {
      req.task = task;
      next();
    } else {
      return res.status(404).json({
        message: "Task does not exist, or has already been deleted.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error intercepting Task",
      message: error.message,
    });
  }
});

export default router;
