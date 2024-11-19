import Tag from "#models/Tag.js";
import User from "#models/User.js";

export const index = async (req, res) => {
  try {
    const user = await User.find({ email: req.user.email });
    const data = await Tag.find({ user: user.id });

    return res.json({
      data,
    });
  } catch ({ message }) {
    return res.status(500).json({
      error: "Error getting tags",
      message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Tag.findById(id);

    return res.json({
      data,
    });
  } catch ({ message }) {
    return res.status(500).json({
      error: "Error getting tag",
      message,
    });
  }
};

export const store = async (req, res) => {
  try {
    const tag = req.body.tag;

    if (!tag) {
      return res.status(500).json({
        error: "No tag body",
      });
    }

    const user = await User.findOne({ email: req.user.email });

    tag.user = user._id;

    const data = await Tag.create(tag);

    return res.json({
      data,
    });
  } catch ({ message }) {
    return res.status(500).json({
      error: "Error creating tag",
      message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;

    const payload = req.body.tag;

    await Tag.findByIdAndUpdate(id, payload);

    const data = await Tag.findById(id);

    return res.json({
      data,
      updated: true,
    });
  } catch ({ message }) {
    return res.status(500).json({
      error: "Error updating tag",
      message,
      updated: false,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const _id = req.params.id;

    await Tag.deleteOne({ _id });

    return res.json({
      deleted: true,
    });
  } catch ({ message }) {
    return res.status(500).json({
      error: "Error deleting tag",
      message,
      deleted: false,
    });
  }
};

export const intercept = async (req, res, next, id) => {
  try {
    const tag = await Tag.findById(id);
    if (tag) {
      const user = await User.findOne({ email: req.user.email });
      const currentUser = user._id;
      const forbidden = !tag.user.equals(currentUser);
      if (forbidden) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Action is forbidden.",
        });
      }

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
