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
       const user = await User.findOne({ email: "khamitamantaev@gmail.com"})
       console.log(user)
        // const user = await User.findOne({ email: session.user.email})
        // const allTrees = await Tree.find()
        res.status(201).json({
          trees: user.trees
        })
      } catch(error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const user = await User.findOne({ email: session.user.email})
        console.log(user)

        const tree = await Tree.create({
          name: req.body.name,
          rootUser: user._id
        })
        const branch = await Branch.create({
          name: "Your First Branch",
          treeID: tree._id,
          parentID: null,
          rootUser: req.body.rootUser,
        })
        let treebranches = tree.branches;
        treebranches.push(branch)
        await tree.save()
        let userTrees = user.trees
        userTrees.push(tree)
        await user.save()
        res.status(201).json({ success: true, tree: tree, branch: branch }) //NEED FIX
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}