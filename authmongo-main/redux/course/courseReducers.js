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

export const createCourseReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { loading: true }
    case CREATE_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case CREATE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const coursesLoadReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
      return { loading: true }
    case LOAD_COURSES_SUCCESS:
      return { loading: false, courses: action.payload }
    case LOAD_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseLoadReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case LOAD_COURSE_REQUEST:
      return { loading: true }
    case LOAD_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case LOAD_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
