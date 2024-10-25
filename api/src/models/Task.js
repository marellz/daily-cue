import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    due_date: { type: Date, required: true },
    status: { type: String, default: "pending" },
    completed: { type: Boolean, default: false },
    tags: { type: Array },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If implementing authentication
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
