import User from "#models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

export const user = async (req, res) => {
  try {
    const { _id, name, email } = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.json({ data: { _id, name, email } });
  } catch (error) {
    return res.status(500).json({
      error: "Error returning user",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email/password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email/password" });
    }

    const token = generateToken(user.email);

    res.status(200).json({ token, data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(email);

    return res.json({
      data: user,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const logout = (req, res, next) => {
  return res.json({ message: 'Logged out' });
};

export const recoverPassword = () => {};

export const resetPassword = () => {};
