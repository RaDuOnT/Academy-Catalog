import {
    FIND_USERS_SUCCESS,
    CREATE_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_FAILURE,
} from "../actionTypes/userActionTypes";
import usersService from '../services/userRequests';
import { authUserSuccess } from './authenticationActions';

// This is the action creator
function findUsersSuccess(userList) {
    return {
        type: FIND_USERS_SUCCESS,
        data: userList
    };
}

export const findAllUsers = () => (dispatch, getState) => {
    return usersService
        .find()
        .then((json) => {
            dispatch(findUsersSuccess(json.data));
        })
        .catch((err) => {
            // dispatch(findUsersFailure(err));
        });
};

function addNewUser(user) {
    return {
      type: CREATE_USER_SUCCESS,
      data: user,
    };
  }
  
  export const createUser = (user) => (dispatch, getState) => {
    return usersService
      .create(user)
      .then((json) => {
        dispatch(addNewUser(json));
      })
      .catch((err) => {
        // dispatch(findAllArticlesFailure(err));
      });
  }


function deleteUserSuccess(deletedUser) {
    return {
        type: DELETE_USER_SUCCESS,
        data: deletedUser,
    };
}

function deleteUserFailure(deletedUser) {
    return {
        type: DELETE_USER_FAILURE,
        data: deletedUser,
    };
}


export const deleteUser = (userId, successMessage, failMessage) => (dispatch, getState) => {
    return usersService
        .remove(userId)
        .then((json) => {
            dispatch(deleteUserSuccess(userId));
            successMessage();
        })
        .catch((err) => {
            dispatch(deleteUserFailure(err));
            failMessage();
        });
}

function updateUserSuccess(updatedUser) {
    return {
        type: UPDATE_USER_SUCCESS,
        data: updatedUser,
        updateError: false,
    };
}

function updateUserFailure(err) {
    return {
        type: UPDATE_USER_FAILURE,
        updateError: true,
        errorMessage: err.message,
    };
}

export const updateUser = (user, updateSuccess, updateFail) => (dispatch, getState) => {
    return usersService
    .updateWithPatch(user._id, user)
        .then((json) => {
            dispatch(updateUserSuccess(json));
            dispatch(authUserSuccess({user: json}));
            updateSuccess();
        })
        .catch((err) => {
            dispatch(updateUserFailure(err));
            updateFail();
        });
}

export const updateUsers = (user, updateSuccess, updateFail) => (dispatch, getState) => {
    return usersService
    .updateWithPatch(user._id, user)
        .then((json) => {
            dispatch(updateUserSuccess(json));
            updateSuccess();
        })
        .catch((err) => {
            dispatch(updateUserFailure(err));
            updateFail();
        });
}