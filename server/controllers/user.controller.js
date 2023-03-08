import User from "../models/user.model.js";
import { decryptData } from "../utils/crypto.util.js";

export const readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};
export const updateController = async (req, res) => {
  const { password, old_password } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (old_password && password) {
      let isMatched = !user.authenticate(decryptData(old_password));
      if (isMatched) {
        return res.status(400).json({
          error: "Old password is not correct.",
        });
      }
      user.password = decryptData(password);
      await user.save();
    }
    return res.status(201).json({
      message: "Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Something went wrong. Please try again later",
    });
  }
};
