import express from "express"
import { protect } from "../middlewares/auth.js";
const router = express.Router();

import {
  createTaskController,
  getUserTasksController,
  getAllTaskController,
  getTaskDetailController,
} from "../controllers/task.controller.js"

router.post("/create/task", protect, createTaskController);
router.get("/tasks", protect, getUserTasksController);
router.get("/task/:id", getTaskDetailController);

export default router;
