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
            res.status(500).json(error);
        }
    }

    if (method === "DELETE") {
        try {
            await Tree.findByIdAndDelete(id)
            await Branch.deleteMany({ treeID: id })
            await User.update({email: session.user.email}, { $pull: { trees: { _id: id } } }, { multi: true })
            res.status(200).json({ message: "The Tree has been deleted!!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
