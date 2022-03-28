import dbConnect from "../../../util/dbConnect"
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'
import User from '../../../models/User'
import { getSession } from "next-auth/react"

async function deleteChilds(nodeList, user, treeID) {
    await Branch.updateMany({}, { $pull: { branches: { _id: nodeList._id } } }, { multi: true })
    await Tree.update({}, { $pull: { branches: { _id: nodeList._id } } }, { multi: true })
    if (nodeList.branches) {
        await Promise.all(nodeList.branches.map(async node => {
            const branch = await Branch.findOne(node)

            if (branch.branches) {
                await deleteChilds(branch,user, treeID)
            }
            await Branch.deleteOne(node)
        }))
    }
    
    let currentTree = await Tree.findById(treeID).exec(); 
    let treebranches = currentTree.branches
    treebranches = treebranches.filter(branch => branch._id !== nodeList._id)
    await User.update(
        { _id: user._id, "trees._id": treeID },
        {
          $set: {
            "trees.$.branches": treebranches,
          }
        }
      )
}

export default async function handler(req, res) {
    const {
        method,
        query: { id },
    } = req;

    const session = await getSession({ req })

    await dbConnect()

    if (method === "DELETE") {
        try {
            const user = await User.findOne({ email: session.user.email })
            const branch = await Branch.findByIdAndDelete(id)
            await deleteChilds(branch, user, req.body.treeID)
            res.status(200).json({ message: "Ветка удалена успешно" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
