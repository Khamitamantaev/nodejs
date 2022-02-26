import connectDB from "./connection/db.connection"
import User from "./models/userModel"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
connectDB()

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            const { email, password } = req.body
            const user = await User.findOne({ email: email })

            if (!user) {
                return res.status(422).json({ error: "User does not exist" })
            }

            const doMatch = await bcrypt.compare(password, user.password)
            if (!doMatch) {
                res.status(404).json({ message: "Incorrect Credentials" })
            } else {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                    expiresIn: "7d"
                })
                res.status(201).json({ message: 'login success', user, token})
            }
            
        }
    } catch (error) {
        console.log(error)
    }
}