import connectDB from "./connection/db.connection"
import User from "./models/userModel"
import bcrypt from "bcryptjs"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password, firstName, lastName} = req.body
    
      const user = await User.findOne({ email: email })

      if (user) {
        return res.status(422).json({ error: "User already exists" })
      }

      const HashedPassword = await bcrypt.hash(password, 12)
      const newUser = await new User({
        name: `${firstName} ${lastName}`,
        email: email,
        password: HashedPassword
      }).save()
      res.status(200).json({ message: "Sign Up Sucess" })
    }
  } catch (error) {
    console.log(error)
  }
}