import {
   AUTH_USER_SUCCESS,
   AUTH_USER_FAILURE
  } from "../actionTypes/authenticationActionTypes";
import authService from "../services/authenticationRequest";
  
  export function authUserSuccess(userObj) {
    return {
      type: AUTH_USER_SUCCESS,
      payload: userObj
    };
  }
  
  export const authUser = (user,success) => (dispatch, getState) => {
    return authService
    .create(user)
    .then((json) => {
    localStorage.setItem("token", json.accessToken)
    localStorage.setItem("expirationDate", json.authentication.payload.exp)
      dispatch(authUserSuccess(json));
      success();
    })
    .catch((error) => {
    //   const errorMsg = error.message;
    //   dispatch(addNewUserFailure(errorMsg));
    });
  };
  