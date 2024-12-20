const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sunsingh162:v52RUHP0DQmTfhRQ@sunnycluster.kzqef.mongodb.net/FormApp")
    } catch (error) {
        console.log("MongoDB connection is failed" + error)
    }
}

module.exports = connectDB