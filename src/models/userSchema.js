const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 12,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 10,
      maxLength: 30,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Your password is not strong: " + value);
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "FormApp@6798", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashedPassword
  );
  return isPasswordValid;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
