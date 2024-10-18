import Task from "../models/Task.js";

export const index = async (req, res) => {
  try {
    const items = await Task.find({});
    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const get = async (req, res) => {
  const item = req.task;
  try {
    return res.status(200).json({
      item,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error getting this task",
      message: error.message,
    });
  }
};

export const store = async (req, res) => {
  try {
    let { title, description, date, completed = false } = req.body;

    const task = await Task.create({
      title,
      description,
      date,
      completed,
    });

    return res.status(200).json({ task });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating task", message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    const item = await Task.findById(id);

    return res.status(200).json({
      item,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error updating task",
      message: error.message,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    return res.status(200).json({
      deleted: true
    });

  } catch (error) {
    return res.status(500).json({
      error: "Error deleting task",
      message: error.message,
    });
  }
};
