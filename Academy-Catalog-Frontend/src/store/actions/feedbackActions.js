import {
    FIND_FEEDBACK_SUCCESS,
    FIND_FEEDBACK_FAILURE,
    ADD_NEW_FEEDBACK_SUCCESS,
    ADD_NEW_FEEDBACK_FAILURE,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAILURE,
    UPDATE_FEEDBACK_SUCCESS,
    UPDATE_FEEDBACK_FAILURE
} from "../actionTypes/feedbackActionTypes";
import feedbackService from '../services/feedbackRequests';
 
// This is function that validates the get method
function findFeedbacksSuccess(feedbackList) {
    return {
      type: FIND_FEEDBACK_SUCCESS,
      data: feedbackList,
    }; 
  }
  
  function findFeedbacksFailure(feedbackList) {
    return {
      type: FIND_FEEDBACK_FAILURE,
      listerror: true,
    }; 
  }
  
  // This is the get action
  export const findAllFeedbacks = () => (dispatch, getState) => {
    return feedbackService
      .find()
      .then((json) => {
        dispatch(findFeedbacksSuccess(json.data));
      })
      .catch((err) => {
        dispatch(findFeedbacksFailure(err));
      });
  };
  
  // This is the function that validates the post method
  function addFeedbackSucces(feedback) {
    return {
      type: ADD_NEW_FEEDBACK_SUCCESS,
      data: feedback,
    };
  }
  
  function addFeedbackFailure(feedback) {
    return {
      type: ADD_NEW_FEEDBACK_FAILURE,
      data: feedback,
    };
  }
  
  // This is the post action
  export const createFeedback = (feedback) => (dispatch, getState) => {
    return feedbackService
      .create(feedback)
      .then((json) => {
        dispatch(addFeedbackSucces(json));
      })
      .catch((err) => {
        dispatch(addFeedbackFailure(err));
      });
  }
  
  //This is the function that validates the patch method
  function updateFeedbackSucces(feedback) {
    return {
      type: UPDATE_FEEDBACK_SUCCESS,
      data: feedback,
    };
  }
  
  function updateFeedbackFailure(feedback) {
    return {
      type: UPDATE_FEEDBACK_FAILURE,
      data: feedback,
    };
  }
  
  // This is the update action
  export const patchfeedbacks = (feedback) => (dispatch, getState) => {
    return feedbackService 
      .update(feedback._id, feedback)
      .then((json) => {
        dispatch(updateFeedbackSucces(json));
      })
      .catch((err) => {
        dispatch(updateFeedbackFailure(err));
      });
  }
  
  //This is the function that validates the delete method
  function deleteFeedbackSucces(feedback) {
    return {
      type: DELETE_FEEDBACK_SUCCESS,
      data: feedback,
    };
  }
  
  function deleteFeedbackFailure(feedback) {
    return {
      type: DELETE_FEEDBACK_FAILURE,
      data: feedback,
    };
  }
  
  // This is the delete action
  export const deletefeedbacks = (feedback) => (dispatch, getState) => {
    return feedbackService
      .remove(feedback)
      .then((json) => {
        dispatch(deleteFeedbackSucces(json));
      })
      .catch((err) => {
        dispatch(deleteFeedbackFailure(err));
      });
  }