import connectDB from "./connection/db.connection"
const db = require("./models");
const User = db.user;
connectDB()

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password} = req.body
      const user = new User({ email: email, password: password});
      
    user
    .save(user)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
      res.status(200).json({ message: "Sign Up Sucess" })
    }
  } catch (error) {
    console.log(error)
  }
}