const express = require('express');
const connectDB = require('./config/database');
const cookiesParser = require("cookie-parser");

const app = express()

app.use(express.json());
app.use(cookiesParser());

const authRouter = require("./routes/auth");

app.use("/", authRouter);

connectDB()
.then(() => {
    console.log("Database is connected successfully!")
    app.listen(3000,() => {
        console.log(`Server is running on 3000`)
    })
}).catch((err) => {
    console.log("Connection not established" + err)
})