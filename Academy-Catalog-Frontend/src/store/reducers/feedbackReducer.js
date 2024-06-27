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
  
  const initialState = {
    feedbacks: [],
    listError: false,
    addErorr: false,
    updateError: false,
    deleteError: false,
  };
  
  const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case FIND_FEEDBACK_SUCCESS:
        return {
          ...state,
          feedbacks: action.data,
          listError: false,
        };
  
      case FIND_FEEDBACK_FAILURE:
        return {
          ...state,
          listError: true,
        };
  
      case ADD_NEW_FEEDBACK_SUCCESS:
        return {
          ...state,
          feedbacks: [...state.feedbacks, action.data],
          addErorr: false,
        };
  
      case ADD_NEW_FEEDBACK_FAILURE:
        return {
          ...state,
          addErorr: true,
        };
  
      case UPDATE_FEEDBACK_SUCCESS:
        const feedbackCopy = [...state.feedbacks];
        const foundIndex = feedbackCopy.findIndex(
          (elem) => elem._id === action.data._id
        );
        feedbackCopy[foundIndex] = action.data;
        return {
          ...state,
          feedbacks: feedbackCopy,
          updateError: false,
        };
  
      case UPDATE_FEEDBACK_FAILURE:
        return {
          ...state,
          updateError: true,
        };
  
      case DELETE_FEEDBACK_SUCCESS:
        const feedbackDelete = state.feedbacks.filter(
          (elem) => elem._id !== action.data._id
          );
        return {
          ...state,
          feedbacks: feedbackDelete,
          deleteError: false,
        };
  
      case DELETE_FEEDBACK_FAILURE:
        return {
          ...state,
          deleteError: true,
        };
  
      default:
        return state;
    }
  };
  
  export default feedbackReducer;
  