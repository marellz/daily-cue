import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    due_date: { type: Date, required: true },
    status: { type: String, default: "pending" },
    completed: { type: Boolean, default: false },
    tags: [{type: mongoose.Schema.Types.ObjectId, ref:"Tag"}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
