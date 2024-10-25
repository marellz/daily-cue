import Task from "#models/Task.js";
import moment from "moment";
export const index = async (req, res) => {
  // TODO: localised/format date

  try {
    let due_date;

    if (req.query.date) {
      due_date = moment(req.query.date);
    } else {
      due_date = moment();
    }

    let day_start = due_date.startOf("day").toDate();
    let day_end = due_date.endOf("day").toDate();

    let query_parameters = {
      due_date: { $gte: day_start, $lte: day_end },
    };

    const data = await Task.find(query_parameters);

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const data = req.task;
    if (!data) {
      throw { message: "Failed to get task by the provided id" };
    }
    return res.status(200).json({
      data,
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
    let { title, description, status, due_date, completed = false } = req.body;

    if (due_date === null) {
      due_date = moment().add(2, "hours");
    }

    const data = await Task.create({
      title,
      description,
      due_date: moment(due_date),
      status,
      completed,
    });

    return res.status(200).json({ data });

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating task", message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {...req.body}

    if(payload.status === 'complete'){
      payload.completed = true
    }

    await Task.findByIdAndUpdate(id, payload);

    const data = await Task.findById(id);

    return res.status(200).json({
      data,
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
      deleted: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error deleting task",
      message: error.message,
    });
  }
};
