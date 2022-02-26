import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import isInstructor from "../../../../../utils/middleware/isInstructor"

connectDB()

export default isInstructor(async (req, res) => {
  console.log(req.method)

  console.log(JSON.parse(req.body))

  const { slug } = req.query

  const nonObjlessons = Object.values(JSON.parse(req.body))

  // console.log(nonObjlessons)

  // return

  const lessons = nonObjlessons.map((item) => ({
    title: item.title || "",
    description: item.description || "",
    media: "lesson",
    playlistId: item.playlistId || "",
    videoId: item.videoId || "",
    thumbnailUrl: item.thumbnailUrl || "",
    channelTitle: item.channelTitle || "",
    file_path: item.file_path || "",
    file_mimetype: item.file_mimetype || "",
    name: item.name || "",
  }))
  console.log(lessons)

  const updated = await Course.findOneAndUpdate(
    { slug },
    {
      lessons: lessons,
    },
    {
      new: true,
    }
  ).exec()

  console.log(updated)

  return res.json(updated)
})

export const lessonOrder = async (req, res) => {}
