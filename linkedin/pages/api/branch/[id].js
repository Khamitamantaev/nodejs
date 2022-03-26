import dbConnect from "../../../util/dbConnect"
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'

function deleteChilds(nodeList) {
    await Branch.update({}, { $pull: { branches: { _id: nodeList._id } } }, { multi: true })
    await Tree.update({}, { $pull: { branches: { _id: nodeList._id } } }, { multi: true })
    if (nodeList.branches) {
        await Promise.all(nodeList.branches.map(async node => {
            const branch = await this.Branch.findOne(node)

            if (branch.branches) {
                await this.deleteChilds(branch)
            }
            await this.branchModel.deleteOne(node)
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
        await deleteChilds(branch)
        res.status(200).json({ message: "The Branch has been deleted!!" });
    } catch (error) {
        res.status(500).json(error);
    }
}
}
