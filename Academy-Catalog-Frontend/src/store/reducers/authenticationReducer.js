import {
 AUTH_USER_SUCCESS,
 AUTH_USER_FAILURE

  } from "../actionTypes/authenticationActionTypes";
  
  const initialState = {
   authenticated: false,
   currentUser: {}
  };
  

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER_SUCCESS:
            return {
              ...state,
              authenticated: true,
              currentUser: action.payload.user
            };
        default: return state;
    }
  };
  
  export default authReducer;
  