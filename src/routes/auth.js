const express = require("express");
const { validateData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userSchema");

const authRouter = express.Router();

//Signup user
authRouter.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateData(req);

    const { userName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      userName,
      email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    // Create a JWT Token
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.json({ message: "Login successful", data: user });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Logout user
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successfully");
});

module.exports = authRouter;
