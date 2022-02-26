import axios from "axios"
import {
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  LOAD_COURSES_FAIL,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSE_FAIL,
  LOAD_COURSE_REQUEST,
  LOAD_COURSE_SUCCESS,
} from "./courseTypes"
import absoluteUrl from "next-absolute-url"
import { parseCookies } from "nookies"

const cookies = parseCookies()

export const courseCreate = (image, values, user) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST })

    var strNum = values.price
    strNum = strNum.toString().replace("£", "")
    values.price = parseFloat(strNum)

    console.log("action", user, cookies.token)

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(
        "/api/instructor/course/create",
        {
          image,
          ...values,
        },
        config
      )
      dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: data,
      })
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const { data } = await axios.post(
        "/api/instructor/course/create",
        {
          image,
          ...values,
        },
        config
      )
      dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const loadCourses = (user, token, req) => async (dispatch) => {
  // console.log("load action", user, token)
  try {
    const { origin } = absoluteUrl(req)

    console.log("orginin", origin)
    dispatch({ type: LOAD_COURSES_REQUEST })

    if (user._id) {
      // console.log("load actiondscasd", user, token)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      console.log("config", config)
      const { data } = await axios.get(
        `${origin}/api/instructor/courses`,
        config
      )
      console.log("data", data)

      dispatch({
        type: LOAD_COURSES_SUCCESS,
        payload: data,
      })
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.get(
        `${origin}/api/instructor/courses`,
        config
      )
      dispatch({
        type: LOAD_COURSES_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: LOAD_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const loadCourse = (user, token, req, slug) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_COURSE_REQUEST })

    const { origin } = absoluteUrl(req)

    if (user._id) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(
        `${origin}/api/instructor/course/${slug}`,
        config
      )
      console.log("data", data)

      dispatch({
        type: LOAD_COURSE_SUCCESS,
        payload: data,
      })
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.get(`${origin}/api/course/${slug}`, config)
      dispatch({
        type: LOAD_COURSE_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: LOAD_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
