import express from "express"
const router = express.Router();
import { protect } from "../middlewares/auth.js";
import {
	readController,
	updateController,
} from "../controllers/user.controller.js"

router.get('/user/:id', protect, readController);
router.put('/user/update', protect, updateController);
// router.put('/admin/update', protect, adminMiddleware, updateController);

export default router;