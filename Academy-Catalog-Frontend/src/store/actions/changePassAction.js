import {
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_FAIL,
} from "../actions/changePassActions";
import authService from "../services/authenticationRequest";

export function authUserSuccess(userObj) {
  return {
    type: CHANGE_PASS_SUCCESS,
    payload: userObj,
  };
}

export const authUser = (user, success) => (dispatch, getState) => {
  return authService
    .create(user)
    .then((json) => {
      localStorage.setItem("token", json.accessToken);
      localStorage.setItem("expirationDate", json.authentication.payload.exp);
      dispatch(authUserSuccess(json));
      success();
    })
    .catch((error) => {
      //   const errorMsg = error.message;
      //   dispatch(addNewUserFailure(errorMsg));
    });
};
