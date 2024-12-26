const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PRIVATE_SIGN_KEY = process.env.PRIVATE_SIGN_KEY;

const signUpUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists, please use another email address",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        status: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  try {
    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordCorrect) {
        // create a token
        const token = jwt.sign(
          { userID: existingUser._id, userName: existingUser.name },
          PRIVATE_SIGN_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          message: "Login Successful",
          email: existingUser.email,
          token,
        });
      } else {
        res.status(401).json({
          message: "Password or email are incorrect",
        });
      }
    } else {
      res.status(404).json({
        message: "The user not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (newPassword && !oldPassword) {
      return res.status(400).json({
        message: "Old password is required to set a new password",
      });
    }

    // Check if old password is provided and correct
    if (oldPassword) {
      const isOldPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isOldPasswordCorrect) {
        return res.status(401).json({
          message: "Old password is incorrect",
        });
      }
    }

    // Check if the new email is already registered to another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email is already registered",
        });
      }
      user.email = email;
    }

    // Update user fields if they are provided
    if (name) user.name = name;
    if (newPassword) user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUpUser, loginUser, updateUser };
