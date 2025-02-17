import Task from "#models/Task.js";
import User from "#models/User.js";
import moment from "moment";

export const index = async (req, res) => {
  // TODO: localised/format date

  try {
    let due_date;

    let { date, status, tags = [] } = req.query;

    if (date) {
      due_date = moment(date);
    } else {
      due_date = moment();
    }

    const { _id: user } = await User.findOne({ email: req.user.email });

    let day_start = due_date.startOf("day").toDate();
    let day_end = due_date.endOf("day").toDate();

    let query_parameters = {
      due_date: { $gte: day_start, $lte: day_end },
      user,
    };

    if (status && status !== "default") {
      query_parameters.status = status;
    }

    if (tags.length) {
      query_parameters.tags = {
        $in: tags,
      };
    }

    const data = await Task.find(query_parameters).populate("tags");

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
    let { title, description, status, due_date, completed = false, tags = [] } = req.body;

    if (due_date === null) {
      due_date = moment().add(2, "hours");
    }

    const { _id: user } = await User.findOne({ email: req.user.email });

    const created = await Task.create({
      title,
      description,
      due_date: moment(due_date),
      status,
      completed,
      tags,
      user,
    });

    const data = await Task.findById(created._id).populate('tags')

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
    const payload = { ...req.body };

    payload.completed = false;

    if (payload.status === "completed") {
      payload.completed = true;
    }

    delete payload._id;

    await Task.findByIdAndUpdate(id, payload);

    let updated = true;

    const data = await Task.findById(id).populate('tags');

    return res.status(200).json({
      data,
      updated,
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

export const weekly = async (req, res) => {
  try {
    const { start_date } = await req.query;
    const user = await User.findOne({ email: req.user.email });

    const startDate = moment(start_date);
    const endDate = startDate.clone().add(7, "days");
    const parameters = {
      user,
      due_date: {
        $gte: startDate.startOf("day").toDate(),
        $lte: endDate.endOf("day").toDate(),
      },
    };

    const tasks = await Task.find(parameters);

    const days = Array(7)
      .fill()
      .map((d, i) => {
        let thisDay = startDate.clone().add(i, "day");
        const thisDayTasks = tasks.filter((t) => {
          return moment(t.due_date).isSame(thisDay, "day");
        });

        return {
          day: thisDay.format("YYYY-MM-DD"),
          total: thisDayTasks.length,
          pending: thisDayTasks.filter((t) => t.status === "pending").length,
          in_progress: thisDayTasks.filter((t) => t.status === "in_progress")
            .length,
          completed: thisDayTasks.filter(
            (t) => t.status === "completed" && t.completed
          ).length,
        };
      });

    return res.json({
      days,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
    });
  } catch ({ message }) {
    return res.status(500).json({
      error: "Error getting weekly activity",
      message,
    });
  }
};

// middleware
export const intercept = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id);
    // task exists
    if (task) {
      // task belongs to user

      const user = await User.findOne({ email: req.user.email });
      // const taskOwner = typeof task.user
      const currentUser = user._id;

      const forbidden = !task.user.equals(currentUser);

      if (forbidden) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Action is forbidden.",
        });
      }

      // green
      req.task = task;
      next();
    } else {
      return res.status(404).json({
        message: "Task does not exist, or has already been deleted.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error intercepting task",
      message: error.message,
    });
  }
};
