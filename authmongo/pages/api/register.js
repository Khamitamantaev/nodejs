import connectDB from "./connection/db.connection"
import bcrypt from 'bcryptjs'
const db = require("./models");
const User = db.user;


connectDB()

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const { email, password } = req.body

            const user = await User.findOne({ email: email })

            if (user) {
                return res.status(422).json({ error: "User already exists" })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new User({ email: email, password: hashedPassword });

            // Save Data in the database
            newUser
                .save(newUser)
                .then(() => {
                    res.status(200).json({ message: "Sign Up Sucess" })
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Data."
                    });
                })
        }
    } catch (error) {
        console.log(error)
    }
}