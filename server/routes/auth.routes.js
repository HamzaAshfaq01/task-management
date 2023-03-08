import express from "express"
const router = express.Router();

// Load Controllers
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

// forgot reset password
router.put("/forgotpassword", forgotPasswordController);
router.put("/resetpassword", resetPasswordController);

// Google and Facebook Login
router.post("/googlelogin", googleController);

export default router;
