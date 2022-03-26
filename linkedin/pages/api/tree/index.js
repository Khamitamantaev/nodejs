import dbConnect from '../../../util/dbConnect'
import Tree from '../../../models/Tree'
import Branch from '../../../models/Branch'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {

    case 'POST':
      try {
        console.log(req.body)
        const tree = await Tree.create({
          name: req.body.name,
          rootUser: req.body.rootUser
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