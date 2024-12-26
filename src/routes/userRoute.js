const express = require("express");
const {
  signUpUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get("/health", (req, res) => {
  res.json({
    message: "User Route is working fine",
    status: "Working",
  });
});


router.post("/signup", validateUser, signUpUser);

router.post("/login", loginUser);

router.put("/update/:userId", verifyToken, updateUser);

module.exports = router;
