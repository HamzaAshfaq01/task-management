import express from "express";
const router = express.Router();
import { protect } from "../middlewares/auth.js";
import {
  readController,
  updateController,
} from "../controllers/user.controller.js";

router
  .route("/user/:id")
  .all(protect)
  .get(readController)
  .put(updateController);
// router.put('/admin/update', protect, adminMiddleware, updateController);

export default router;
