import {
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_FAIL,
} from "../actions/changePassActions";

const initialState = {
  authenticated: false,
  currentUser: {},
};

const changePassReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASS_SUCCESS:
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload.user,
      };
    default:
      return state;
  }
};

export default changePassReducer;
