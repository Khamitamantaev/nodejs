import { useEffect, useState } from "react"
import axios from "axios"
import CourseCreateForm from "../../../components/forms/CourseCreate"
import Resizer from "react-image-file-resizer"
import { useRouter } from "next/router"
import { Box } from "@mui/material"

import { courseCreate } from "../../../redux/course/courseActions"
// import { loadImages } from "../../../redux/actions/imageActions"
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../../redux/store"
import { getSession } from "next-auth/react"
// import { loadUser } from "../../../redux/actions/userActions"
const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: 0,
    uploading: false,
    paid: false,
    playlistId: "",
    loading: false,
    category: "",
  })
  const [preview, setPreview] = useState("")
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image")
  const dispatch = useDispatch()
  const [files, setFiles] = useState({})

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  console.log(dbUser)

  // const uploadImage = useSelector((state) => state.uploadImage)
  // const { loading, error, image } = uploadImage

  // const getImage = useSelector((state) => state.getImage)
  // const { loading: imageLoading, error: errorGetImage, imageArray } = getImage

  // useEffect(() => {
  //   dispatch(loadImages())
  // }, [image, uploadImage])

  // router
  const router = useRouter()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onDropzoneAreaChange = (files) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      let file = files[0]

      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onload = function () {
        // console.log(reader.result)
      }
      reader.onerror = (error) => reject(error)

      if (file) {
        setValues({ ...values, loading: true })
        Resizer.imageFileResizer(
          file,
          500,
          300,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              // dispatch(imageUpload(uri))

              setFiles(uri)

              setValues({ ...values, loading: false })
            } catch (err) {
              console.log(err)
              setValues({ ...values, loading: false })
              console.log("upload failed. Try later")
            }
          }
        )
      }
    })

  // const handleImageRemove = async (image) => {
  //   console.log(image)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const image = files
    if (values.price === 0 && values.paid === true) {
      values.price = 9.99
    }
    // console.log("files", image)

    try {
      console.log(values)

      console.log("dbUser", dbUser._id)

      if (dbUser._id) {
        console.log("line", dbUser._id)
      }

      dispatch(courseCreate(image, values, dbUser))
      console.log("Great! Now you can start adding lessons")
      // router.push("/src/instructor/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box mt="1rem">
      <h1 className="jumbotron text-center square">Create Course</h1>

      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          // loading={loading}
          // handleImageRemove={handleImageRemove}
          onDropzoneAreaChange={onDropzoneAreaChange}
        />
      </div>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default CourseCreate
