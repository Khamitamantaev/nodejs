import mongoose from "mongoose"
const dbConfig = require("../config/db.config.js");
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    mongoose
        .connect(dbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database!");
        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}

export default connectDB