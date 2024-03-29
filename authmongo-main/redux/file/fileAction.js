import {
  FILE_CREATE_FAIL,
  FILE_CREATE_REQUEST,
  FILE_CREATE_SUCCESS,
  FILE_DELETE_FAIL,
  FILE_DELETE_REQUEST,
  FILE_DELETE_SUCCESS,
  FILE_GET_FAIL,
  FILE_GET_REQUEST,
  FILE_GET_SUCCESS,
} from "./fileTypes"
import axios from "axios"
import { parseCookies } from "nookies"
const cookies = parseCookies()

export const createFile = (user, formData, slug) => async (dispatch) => {
  console.log("createfile", user, slug, formData)

  console.log(cookies.token)
  try {
    dispatch({ type: FILE_CREATE_REQUEST })

    if (user._id) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/instructor/course/file/${slug}`,
        formData,
        config
      )
      console.log("data", data)

      dispatch({
        type: FILE_CREATE_SUCCESS,
        payload: data,
      })
    } else {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const { data } = await axios.post(
        `/api/instructor/course/file`,
        formData,
        config
      )
      console.log("data", data)

      dispatch({
        type: FILE_CREATE_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: FILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFiles = () => async (dispatch) => {
  try {
    dispatch({ type: FILE_GET_REQUEST })

    const { data } = await axios.get(`/api/file/file/getFiles`)

    dispatch({
      type: FILE_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteFileCourse = (id) => async (dispatch) => {
  console.log(id)

  try {
    dispatch({ type: FILE_DELETE_REQUEST })

    const { data } = await axios.delete(`/api/file/delete/${id}`)

    dispatch({
      type: FILE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
