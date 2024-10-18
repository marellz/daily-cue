import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If implementing authentication
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
