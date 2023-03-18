import mongoose from "mongoose";
import crypto from "crypto";

const taskScheama = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      default: "LOW",
    },
    due_date: {
      type: String,
    },
    status: {
      type: String,
      default: "PENDING",
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskScheama);
