import dbConnect from '../../../util/dbConnect'
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    // case 'GET':
    //   try {
    //     const users = await User.find({})
    //     res.status(200).json({ success: true, data: users })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    case 'POST':
      try {
        
        let parentBranch = await Branch.findById(req.body.parentID).exec()
        let children = parentBranch.branches;
        console.log("childre1"+children)
        const newBranch = await Branch.create({
          name: req.body.name,
          rootUser: req.body.rootUser,
          treeID: req.body.treeID,
          parentID: req.body.parentID
        }) 
        
        let currentTree = await Tree.findById(req.body.treeID).exec();
       
        let treebranches = currentTree.branches;
        
        treebranches.push(newBranch)
       
        children.push(newBranch)
        console.log("childre2"+children)
        await Branch.findByIdAndUpdate(req.body.parentID, { branches: children }, { useFindAndModify: false });
        await Tree.findByIdAndUpdate(currentTree.id, { branches: treebranches }, { useFindAndModify: false });
        newBranch.save()
        res.status(201).json({ success: true, newBranch: newBranch })
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

