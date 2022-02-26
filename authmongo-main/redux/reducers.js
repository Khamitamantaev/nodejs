import { combineReducers } from "redux"
import {
  courseLoadReducer,
  coursesLoadReducer,
  createCourseReducer,
} from "./course/courseReducers"
import { filesCreateReducer } from "./file/fileReducer"

import { profileReducer, newInstructorReducer } from "./user/userReducer"

const reducers = combineReducers({
  profile: profileReducer,
  newInstructor: newInstructorReducer,
  //courses
  createCourse: createCourseReducer,
  coursesLoad: coursesLoadReducer,
  courseLoad: courseLoadReducer,
  //file
  filesCreate: filesCreateReducer,
})

export default reducers
