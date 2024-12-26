const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cors = require("cors");

const userRoute = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
  .then(() => {
    console.log("Database is connected successfully!");
    app.listen(3000, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection not established" + err);
  });

app.use("/health", (req, res) => {
  res.json({
    message: "Working Fine",
  });
});

app.use("/user", userRoute);
