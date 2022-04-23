import dbConnect from '../../../util/dbConnect'
import Tree from '../../../models/Tree'
import Branch from '../../../models/Branch'
import User from '../../../models/User'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const { method } = req
  const session = await getSession({ req })
  await dbConnect()

  switch (method) {

    case 'GET':
      try {
       const user = await User.findOne({ email: session.user.email})
       const trees = await Tree.find({ isPrivate: false})
        res.status(201).json({
          trees: trees
        })
      } catch(error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
