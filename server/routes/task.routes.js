import express from "express"
import { protect } from "../middlewares/auth.js";
const router = express.Router();

import {
  createTaskController,
  getAllTaskController,
  getTaskDetailController,
  updateTaskController,
  deleteTaskController
} from "../controllers/task.controller.js"


router.post("/create/task", protect, createTaskController);
router.get("/tasks", protect, getAllTaskController);
router.route("/task/:id").all(protect).patch(updateTaskController).delete(deleteTaskController);

export default router;
