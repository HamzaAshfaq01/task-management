import User from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import SendMail from "../helpers/sendMail.js";
import {
  GOOGLE_CLIENT,
  JWT_ACCOUNT_ACTIVATION,
  EMAIL_FROM,
  CLIENT_URL,
  JWT_SECRET,
  JWT_RESET_PASSWORD,
} from "../constants/config.const.js";
import { encryptData, decryptData } from "../utils/crypto.util.js";

const client = new OAuth2Client(GOOGLE_CLIENT);

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: decryptData(email) });

    if (user)
      return res.status(400).json({
        error: "Email is already taken.",
      });

    const token = jwt.sign(
      {
        name,
        email,
        password,
      },
      JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "30m",
      }
    );

    const emailData = {
      from: EMAIL_FROM,
      to: decryptData(email),
      subject: "Account activation link",
      html: `
                <h1>Please use the following to activate your account</h1>
                <p>${CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>${CLIENT_URL}</p>
            `,
    };

    SendMail(emailData, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};

export const activationController = async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_ACCOUNT_ACTIVATION);
      const expiresAt = new Date(decoded.exp * 1000);
      if (new Date() > expiresAt) {
        return res.status(403).json({
          error: "Token is expired. Please signup again",
        });
      }
      const { name, email, password } = decoded;
      const userExits = await User.findOne({ email: decryptData(email) });
      if (userExits) {
        return res.status(403).json({
          error: "Your account is already active",
        });
      }
      const user = await User.create({
        name: decryptData(name),
        email: decryptData(email),
        password: decryptData(password),
      });
      if (!user) {
        return res.status(500).json({
          error: "Please try again",
        });
      }
      return res.json({
        token,
        message: "Your Account has been created",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong. Please try again",
      });
    }
  } else {
    return res.status(500).json({
      error: "Something went wrong. Please try again",
    });
  }
};
export const signinController = async (req, res) => {
  try {
    // check if user exist
    const user = await User.findOne({ email: decryptData(req.body.email) });
    if (!user) {
      return res.status(404).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    if (!user.authenticate(decryptData(req.body.password))) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const { _id, name, email } = user;

    return res.json({
      message: "Login Succesfull",
      token,
      user: {
        _id,
        name: encryptData(name),
        email: encryptData(email),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong. Please try again later",
    });
  }
};
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: decryptData(email) });
    if (!user)
      return res.status(400).json({
        error: "User with that email does not exist.Please Sign up",
      });
    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_RESET_PASSWORD,
      {
        expiresIn: "30m",
      }
    );

    const emailData = {
      from: EMAIL_FROM,
      to: decryptData(email),
      subject: `Password Reset link`,
      html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${CLIENT_URL}/auth/reset-password/${token}</p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${CLIENT_URL}</p>
                `,
    };

    const updatedUser = await user.updateOne({ resetPasswordLink: token });

    if (!updatedUser)
      return res.status(400).json({
        error: "Database connection error on user password forgot request",
      });

    SendMail(emailData, res);
  } catch (error) {}
};
export const resetPasswordController = async (req, res) => {
  // const { resetPasswordLink, newPassword } = req.body;
  const { password1 } = req.body;
  let token = req.params.token;
  try {
    if (token) {
      const decoded = jwt.verify(token, JWT_RESET_PASSWORD);
      const expiresAt = new Date(decoded.exp * 1000);
      if (new Date() > expiresAt) {
        return res.status(403).json({
          error: "Token is expired. Please try again",
        });
      }
      const user = await User.findOne({ resetPasswordLink: token });
      if (!user)
        return res.status(400).json({
          error: "Invalid token",
        });

      user.password = decryptData(password1);
      user.resetPasswordLink = "";

      await user.save();

      return res.status(201).json({
        message: "Password Updated Success",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Expired link. Try again",
    });
  }
};
// Google Login
export const googleController = async (req, res) => {
  const { idToken } = req.body;
  try {
    const varified = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT,
    });

    const { email_verified, name, email } = varified.payload;

    if (!email_verified)
      return res.status(400).json({
        error: "Google login failed. Try again",
      });

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const { _id, email, name } = user;
      return res.json({
        message: "Login Succesfull",
        token,
        user: { _id, email, name },
      });
    } else {
      let password = email + JWT_SECRET;

      const user = await User.create({
        name,
        email,
        password,
      });

      if (!user)
        return res.status(400).json({
          error: "User signup failed with google",
        });
      const token = jwt.sign({ _id: data._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const { _id, email, name } = data;
      return res.json({
        message: "Login Succesfull",
        token,
        user: { _id, email, name },
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Error while google login. Please try again",
    });
  }
};
