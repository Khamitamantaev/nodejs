import dbConnect from '../../../util/dbConnect'
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'
import User from '../../../models/User'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const { method } = req
  const session = await getSession({ req })
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const user = await User.findOne({ email: session.user.email })
        let currentTree = await Tree.findById(req.body.treeID).exec();
        const userID = user._id.toString()
        const currentTREE = currentTree.rootUser.toString()
        if (userID === currentTREE) {
          let parentBranch = await Branch.findById(req.body.parentID).exec()
          let children = parentBranch.branches;
          const newBranch = await Branch.create({
          rootUser: user._id,
          name: req.body.name,
          treeID: req.body.treeID,
          parentID: req.body.parentID,
          imageBranch: req.body.imageBranch,
          description: req.body.description,
          code: req.body.code,
          url: req.body.url,
          rootConfirm: true,
          isMain: req.body.isMain
        })
     
        let treebranches = currentTree.branches;
        treebranches.push(newBranch)
        children.push(newBranch)
        await Branch.findByIdAndUpdate(req.body.parentID, { branches: children }, { useFindAndModify: false });
        await Tree.findByIdAndUpdate(currentTree.id, { branches: treebranches }, { useFindAndModify: false });
        newBranch.save()
        res.status(201).json({ success: true, newBranch: newBranch })
        }
        else {
          let parentBranch = await Branch.findById(req.body.parentID).exec()
          let children = parentBranch.branches;
          const newBranch = await Branch.create({
          rootUser: currentTree.rootUser,
          name: req.body.name,
          treeID: req.body.treeID,
          parentID: req.body.parentID,
          imageBranch: req.body.imageBranch,
          description: req.body.description,
          code: req.body.code,
          url: req.body.url,
          rootConfirm: false,
          isMain: false
        })
        let treebranches = currentTree.branches;
        treebranches.push(newBranch)
        children.push(newBranch)
        await Branch.findByIdAndUpdate(req.body.parentID, { branches: children }, { useFindAndModify: false });
        await Tree.findByIdAndUpdate(currentTree.id, { branches: treebranches }, { useFindAndModify: false });
        newBranch.save()
        res.status(201).json({ success: true, newBranch: newBranch })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

