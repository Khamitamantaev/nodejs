import dbConnect from "../../../util/dbConnect"
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'
import User from '../../../models/User'
import { getSession } from "next-auth/react"

async function deleteChilds(nodeList, treeID) {
    await Branch.updateMany({}, { $pull: { branches: { _id: nodeList._id } } }, { multi: true })
    await Tree.update({}, { $pull: { branches: { _id: nodeList._id } } }, { multi: true })
    if (nodeList.branches) {
        await Promise.all(nodeList.branches.map(async node => {
            const branch = await Branch.findOne(node)

            if (branch.branches) {
                await deleteChilds(branch, treeID)
            }
            await Branch.deleteOne(node)
        }))
    }
}

export default async function handler(req, res) {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect()

    if (method === "DELETE") {
        try {
            const branch = await Branch.findByIdAndDelete(id)
            await deleteChilds(branch, req.body.treeID)
            res.status(200).json({ message: "Ветка удалена успешно" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
