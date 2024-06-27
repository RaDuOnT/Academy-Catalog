import {
  FIND_COURSES_SUCCESS,
  FIND_COURSES_FAILURE,
  ADD_COURSE_FAILURE,
  ADD_COURSE_SUCCESS,
  EDIT_COURSE_FAILURE,
  EDIT_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  DELETE_COURSE_SUCCESS,
  TOGGLE_STATUS_COURSE_FAILURE,
  TOGGLE_STATUS_COURSE_SUCCESS,
} from "../actionTypes/courseActionTypes";

import coursesService from "../services/courseRequests";

// This is the action creator
export function findCoursesSuccess(courseList) {
  return {
    type: FIND_COURSES_SUCCESS,
    data: courseList,
  };
}

export function findAllCoursesFailure(err) {
  return {
    type: FIND_COURSES_FAILURE,
    findAllError: true,
    errorMessage: err.message,
  };
}

export function addCourseSuccess(newCourse) {
  return {
    type: ADD_COURSE_SUCCESS,
    data: newCourse,
  };
}

export function addCourseFailure(err) {
  return {
    type: ADD_COURSE_FAILURE,
    addError: true,
    errorMessage: err.message,
  };
}

export const findAllCourses = () => (dispatch, getState) => {
  return coursesService
    .find()
    .then((json) => {
      dispatch(findCoursesSuccess(json.data));
    })

    .catch((err) => {
      dispatch(findAllCoursesFailure(err));
    });
};

export const addCourse =
  (course, successMessage, failMessage) => (dispatch, getState) => {
    return coursesService
      .create(course)
      .then((json) => {
        dispatch(addCourseSuccess(json));
        successMessage();
      })
      .catch((err) => {
        dispatch(addCourseFailure(err));
        failMessage();
      });
  };
export function editCourseSuccess(newCourse) {
  return {
    type: EDIT_COURSE_SUCCESS,
    data: newCourse,
  };
}

export function editCourseFailure(err) {
  return {
    type: EDIT_COURSE_FAILURE,
    editError: true,
    errorMessage: err.message,
  };
}

export const editCourse =
  (course, successMessage, failMessage) => (dispatch, getState) => {
    return coursesService
      .updateWithPatch(course._id, course)
      .then((json) => {
        dispatch(editCourseSuccess(json));
        successMessage();
      })
      .catch((err) => {
        dispatch(editCourseFailure(err));
        failMessage();
      });
  };

export function deleteCourseSuccess(deletedCourse) {
  return {
    type: DELETE_COURSE_SUCCESS,
    data: deletedCourse,
  };
}

export function deleteCourseFailure(err) {
  return {
    type: DELETE_COURSE_FAILURE,
    deleteError: true,
    errorMessage: err.message,
  };
}

export const deleteCourse =
  (courseId, successMessage, failMessage) => (dispatch, getState) => {
    return coursesService
      .remove(courseId)
      .then((json) => {
        dispatch(deleteCourseSuccess(json));
        successMessage();
      })
      .catch((err) => {
        dispatch(deleteCourseFailure(err));
        failMessage();
      });
  };

export function toggleStatusCourseSuccess(course) {
  return {
    type: TOGGLE_STATUS_COURSE_SUCCESS,
    data: course,
  };
}

export function toggleStatusCourseFailure(err) {
  return {
    type: TOGGLE_STATUS_COURSE_FAILURE,
    toggleStatusError: true,
    errorMessage: err.message,
  };
}

export const toggleStatusCourse =
  (course, successMessage, failMessage) => (dispatch, getState) => {
    return coursesService
      .updateWithPatch(course._id, course)
      .then((json) => {
        dispatch(toggleStatusCourseSuccess(json));
        successMessage();
      })
      .catch((err) => {
        dispatch(toggleStatusCourseFailure(err));
        failMessage();
      });
  };
