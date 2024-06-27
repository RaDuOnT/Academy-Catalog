import {
  FIND_STUDENTS_SUCCESS,
  ADD_NEW_STUDENT,
  EDIT_STUDENT_SUCCESS,
  DELETE_STUDENT_SUCCESS,
  FIND_STUDENTS_FAILURE,
  ADD_NEW_STUDENT_FAILURE,
  EDIT_STUDENT_FAILURE,
  DELETE_STUDENT_FAILURE,
} from "../actionTypes/studentsActionTypes";

const initialState = {
  students: [],
  findError: "",
  addError: "",
  editError: "",
  deleteError:"",
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.data,
      
      };
    case ADD_NEW_STUDENT:
      return {
        ...state,
        students: [...state.students, action.data],
        
        addNewStudent: true,
      };
    case EDIT_STUDENT_SUCCESS:
      const studentsCopy = [...state.students];
      const foundIndex = studentsCopy.findIndex(
        (elem) => elem._id === action.data._id
      );
      studentsCopy[foundIndex] = action.data;

      return {
        ...state,
        students: studentsCopy,
      
      };

      case DELETE_STUDENT_SUCCESS:
      const deleteCopy = [...state.students];
      const deleteIndex = deleteCopy.findIndex(
        (elem) => elem._id === action.data._id
      );
      deleteCopy[deleteIndex] = action.data;

      return {
        ...state,
        students: deleteCopy,
      };

    case FIND_STUDENTS_FAILURE:
      return {
        ...state,
        students: [],
        findError: action.data,
      };

    case ADD_NEW_STUDENT_FAILURE:
      return {
        ...state,
        students: [],
        addError: action.data,
      };

    case EDIT_STUDENT_FAILURE:
      return {
        ...state,
        students: [],
        editError: action.data,
      };

    case FIND_STUDENTS_FAILURE:
      return {
        ...state,
        students: [],
        findError: action.data,
      };

    case ADD_NEW_STUDENT_FAILURE:
      return {
        ...state,
        students: [],
        addError: action.data,
      };

    case EDIT_STUDENT_FAILURE:
      return {
        ...state,
        students: [],
        editError: action.data,
      };

    case DELETE_STUDENT_FAILURE:
      return {
        ...state,
        students: [],
        deleteError: action.data,
      };
    default:
      return state;
  }
};

export default studentsReducer;
