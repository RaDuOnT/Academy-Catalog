// import * as t from '../actionTypes';
import {
  FIND_COURSES_SUCCESS,
  FIND_COURSES_FAILURE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  EDIT_COURSE_FAILURE,
  EDIT_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  DELETE_COURSE_SUCCESS,
  TOGGLE_STATUS_COURSE_FAILURE,
  TOGGLE_STATUS_COURSE_SUCCESS,
} from "../actionTypes/courseActionTypes";

const initialState = {
  courses: [],
  findAllError: false,
  addError: false,
  editError: false,
  deleteError: false,
  toggleError: false,
  errorMessage: "",
  addCourseActionCompleted: false,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_COURSES_SUCCESS:
      
      // return Object.assign({}, state, {
      //     articles: action.data
      // })
      // => acelasi lucru cu urmatorul return
      return {
        ...state,
        courses: action.data,
        findAllError: false,
        errorMessage: "",
      };
    case FIND_COURSES_FAILURE:
      return {
        ...state,
        findAllError: action.findAllError,
        errorMessage: action.errorMessage,
      };

    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.data],
        addError: false,
        errorMessage: "",
        addCourseActionCompleted: true,
      };
    case ADD_COURSE_FAILURE:
      return {
        ...state,
        addError: true,
        errorMessage: "",
        addCourseActionCompleted: true,
      };

    case EDIT_COURSE_SUCCESS:
      const coursesCopy = [...state.courses];
      const foundIndex = coursesCopy.findIndex(
        (elem) => elem._id === action.data._id
      );
      coursesCopy[foundIndex] = action.data;

      return {
        ...state,
        courses: coursesCopy,
        editError: false,
        errorMessage: "",
      };
    case EDIT_COURSE_FAILURE:
      return {
        ...state,
        editError: action.editError,
        errorMessage: "",
      };

    case DELETE_COURSE_SUCCESS:
      const filteredCourses = state.courses.filter(
        (elem) => elem._id !== action.data._id
      );

      return {
        ...state,
        courses: filteredCourses,
        deleteError: false,
        errorMessage: "",
      };
    case DELETE_COURSE_FAILURE:
      return {
        ...state,
        deleteError: action.deleteError,
        errorMessage: "",
      };
    case TOGGLE_STATUS_COURSE_SUCCESS:
      const coursesToggleCopy = [...state.courses];
      const toggleIndex = coursesToggleCopy.findIndex(
        (elem) => elem._id === action.data._id
      );
      coursesToggleCopy[toggleIndex] = action.data;
      return {
        ...state,
        courses: coursesToggleCopy,
        toggleError: false,
        errorMessage: "",
      };
    case TOGGLE_STATUS_COURSE_FAILURE:
      return {
        ...state,
        toggleError: action.toggleError,
        errorMessage: "",
      };

    default:
      return state;
  }
};

export default courseReducer;
