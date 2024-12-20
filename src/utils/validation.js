const validator = require("validator");

const validateData = (req) => {
  const { userName, email, password } = req.body;

  if (!userName) {
    throw new Error("User name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not Strong");
  }
};

module.exports = { validateData };