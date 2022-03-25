import dbConnect from '../../../util/dbConnect'
import Branch from '../../../models/Branch'

export default async function handler (req, res) {
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
        console.log(req.body)
        const branch = await Branch.create({
          name: req.body.name
        })
        
        res.status(201).json({ success: true, data: branch })
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