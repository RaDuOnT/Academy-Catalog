import {
  ADD_NEW_STUDENT,
  FIND_STUDENTS_SUCCESS,
  DELETE_STUDENT_SUCCESS,
  EDIT_STUDENT_SUCCESS,
  FIND_STUDENTS_FAILURE,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT_FAILURE,
  ADD_NEW_STUDENT_FAILURE,
} from "../actionTypes/studentsActionTypes";
import studentsService from "../services/studentsRequests";

// FAILURE
export function findStudentsFailure(findError) {
  return {
    type: FIND_STUDENTS_FAILURE,
    data: findError,
  };
}

export function addNewStudentsFailure(addError) {
  return {
    type: ADD_NEW_STUDENT_FAILURE,
    data: addError,
  };
}

export function editStudentFailure(editError) {
  return {
    type: EDIT_STUDENT_FAILURE,
    data: editError,
  };
}

export function deleteStudentFailure(deleteError) {
  return {
    type: DELETE_STUDENT_FAILURE,
    data: deleteError,
  };
}

// This is the action creator
// SUCCESS CASES
// Read
export function findStudentsSuccess(studentsList) {
  return {
    type: FIND_STUDENTS_SUCCESS,
    data: studentsList,
  };
}

export const findAllStudents = () => (dispatch, getState) => {
  return studentsService
    .find()
    .then((json) => {
      dispatch(findStudentsSuccess(json.data));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(findStudentsFailure(errorMsg));
    });
};

// CREATE
function addNewStudent(student) {
  return {
    type: ADD_NEW_STUDENT,
    data: student,
  };
}

export const createStudent = (student) => (dispatch, getState) => {
  return studentsService
    .create(student)
    .then((json) => {
      dispatch(addNewStudent(json));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(addNewStudentsFailure(errorMsg));
    });
};

// DELETE
function deleteStudent(student) {
  return {
    type: DELETE_STUDENT_SUCCESS,
    data: student,
  };
}

export const deleteStudentAction = (student) => (dispatch, getState) => {
  student.enabled = "no";
  return studentsService
    .updateWithPatch(student._id, student)
    .then((json) => {
      
      dispatch(deleteStudent(json));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(deleteStudentFailure(errorMsg));
    });
};

// EDIT
function editStudentSuccess(student) {
  return {
    type: EDIT_STUDENT_SUCCESS,
    data: student,
  };
}

export const editStudentAction = (student) => (dispatch, getState) => {
  return studentsService
    .updateWithPatch(student._id, student)
    .then((json) => {
      dispatch(editStudentSuccess(json));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(editStudentFailure(errorMsg));
    });
};
