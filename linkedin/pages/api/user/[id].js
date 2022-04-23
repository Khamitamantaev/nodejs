import dbConnect from "../../../util/dbConnect";
import Branch from '../../../models/Branch'
import Tree from '../../../models/Tree'
import User from '../../../models/User'

export default async function handler(req, res) {
    const {
        method,
        query: { id },
    } = req;

    await dbConnect()

    if (method === 'GET') {
        try {
            const user = await User.findOne({
                _id: id
            })
            res.status(201).json({
              user: user
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
