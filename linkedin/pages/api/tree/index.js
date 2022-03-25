import dbConnect from '../../../util/dbConnect'
import Tree from '../../../models/Tree'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {

    case 'POST':
      try {
        console.log(req.body)
        const tree = await Tree.create({
          name: req.body.name
        })
        res.status(201).json({ success: true, data: tree })
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