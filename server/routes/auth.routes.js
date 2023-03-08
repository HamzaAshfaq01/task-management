import express from "express";
const router = express.Router();
import {
  registerController,
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  googleController,
} from "../controllers/auth.controller.js";

router.post("/register", registerController);
router.post("/login", signinController);
router.post("/activation", activationController);
router.put("/forgotpassword", forgotPasswordController);
router.put("/resetpassword/:token", resetPasswordController);
router.post("/googlelogin", googleController);

export default router;
