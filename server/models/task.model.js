import mongoose from "mongoose";
import crypto from "crypto";

const taskScheama = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
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
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskScheama);
