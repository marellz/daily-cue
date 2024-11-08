import User from "#models/User.js";

export const getProfile = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.json({
      data: user,
    });
  } catch ({ message }) {
    return res.status(404).json({
      error: "Error finding user",
      message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        name,
        email,
        avatar,
      }
    );

    if (!user) {
      return res.status(404).json({
        updated: false,
        error: " Error finding existing user profile",
      });
    }

    return res.json({
      updated: true,
      user,
    });

  } catch ({ message }) {
    return res.status(404).json({
      error: "Error updating profile",
      updated: false,
      message,
    });
  }
};
