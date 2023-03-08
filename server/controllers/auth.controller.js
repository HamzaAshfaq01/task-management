import User from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import SendMail from "../helpers/sendMail.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

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
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "30m",
      }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account activation link",
      html: `
                <h1>Please use the following to activate your account</h1>
                <p>${process.env.CLIENT_URL}/activate/${token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
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
      const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
      const { name, email, password } = decoded;
      const user = await User.create({
        name,
        email,
        password,
      });
      if (!user) {
        return res.status(401).json({
          error: "Please try again",
        });
      }
      return res.json({
        token,
        message: "Your Account has been created",
      });
    } catch (error) {
      return res.json({
        error: "Expired link. Please Signup again",
      });
    }
  } else {
    return res.json({
      error: "error happening please try again",
    });
  }
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;

  // check if user exist
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: "User with that email does not exist. Please signup",
    });
  }

  if (!user.authenticate(password)) {
    return res.status(400).json({
      error: "Email and password do not match",
    });
  } 
  try {
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
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
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      error: "User with that email does not exist.Please Sign up",
    });
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_RESET_PASSWORD,
    {
      expiresIn: "30m",
    }
  );

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Password Reset link`,
    html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/password/reset/${token}</p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `,
  };

  const updatedUser = await user.updateOne({ resetPasswordLink: token });

  if (!updatedUser)
    return res.status(400).json({
      error: "Database connection error on user password forgot request",
    });

  SendMail(emailData, res);
};

export const resetPasswordController = async (req, res) => {
  // const { resetPasswordLink, newPassword } = req.body;
  const { password1, password2, token } = req.body;

  if (password1 !== password2)
    return res.status(400).json({
      error: "Passwords don't matches",
    });

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD);
      const user = await User.findOne({ resetPasswordLink: token });
      if (!user)
        return res.status(400).json({
          error: "Invalid token",
        });

      user.password = password1;
      user.resetPasswordLink = "";

      await user.save();

      res.status(201).json({
        message: "Password Updated Success",
      });
    } catch (error) {
      return res.status(400).json({
        error: "Expired link. Try again",
      });
    }
  }
};
// Google Login
export const googleController = async (req, res) => {
  const { idToken } = req.body;

  const varified = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT,
  });

  const { email_verified, name, email } = varified.payload;

  if (!email_verified)
    return res.status(400).json({
      error: "Google login failed. Try again",
    });

  const user = await User.findOne({ email });
  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, email, name } = user;
    return res.json({
      message: "Login Succesfull",
      token,
      user: { _id, email, name },
    });
  } else {
    let password = email + process.env.JWT_SECRET;

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user)
      return res.status(400).json({
        error: "User signup failed with google",
      });
    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, email, name } = data;
    return res.json({
      message: "Login Succesfull",
      token,
      user: { _id, email, name },
    });
  }
};

