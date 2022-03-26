import dbConnect from "../../../util/dbConnect";
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'

export default async function handler(req, res) {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect()

    if (method === "DELETE") {
        try {
            await Tree.findByIdAndDelete(id)
            await Branch.deleteMany({treeID: id})
            res.status(200).json({ message: "The Tree has been deleted!!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
