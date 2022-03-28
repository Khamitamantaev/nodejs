import dbConnect from "../../../util/dbConnect";
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'
import User from '../../../models/User'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    const session = await getSession({ req })
    const {
        method,
        query: { id },
    } = req;

    await dbConnect()

    if (method === 'GET') {
        try {
            const tree = await Tree.findOne({
                id: id
            })
            res.status(201).json({
                tree: tree
            });
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }

    if (method === "DELETE") {
        try {
            console.log(id)
            await Tree.findByIdAndDelete(id)
            await Branch.deleteMany({ treeID: id })
            await User.update({}, { $pull: { trees: { _id: id } } }, { multi: true })
            // const user = await User.findOne({ email: session.user.email})
            // const trees = user.trees.filter(tree=> tree._id === id)

            // await User.findOneAndUpdate({ email: session.user.email }, { $pull: { trees: [{_id: id}] } }, { new: true });
            res.status(200).json({ message: "The Tree has been deleted!!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
