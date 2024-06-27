// import * as t from '../actionTypes';
import {
  CREATE_USER_SUCCESS,
  FIND_USERS_SUCCESS,
  DELETE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actionTypes/userActionTypes";

const initialState = {
  users: [],
  updateError: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_USERS_SUCCESS:
      return {
        ...state,
        users: action.data,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.data],
        addNewUser: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.data),
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateError: false,
        users: state.users.filter((user) => user._id !== action.data),

      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        updateError: true,
        errorMessage: "",
      };

    default:
      return state;
  }
};

export default userReducer;
