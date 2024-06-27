import {
  FIND_RESOURCES_SUCCESS,
  FIND_RESOURCES_FAILURE,
  ADD_NEW_RESOURCE_SUCCESS,
  ADD_NEW_RESOURCE_FAILURE,
  UPDATE_RESOURCE_SUCCESS,
  UPDATE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILURE,
} from "../actionTypes/resourceActionTypes";

const initialState = {
  resources: [],
  listError: false,
  addErorr: false,
  updateError: false,
  deleteError: false,
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_RESOURCES_SUCCESS:
      return {
        ...state,
        resources: action.data,
        listError: false,
      };

    case FIND_RESOURCES_FAILURE:
      return {
        ...state,
        listError: true,
      };

    case ADD_NEW_RESOURCE_SUCCESS:
      return {
        ...state,
        resources: [...state.resources, action.data],
        addErorr: false,
      };

    case ADD_NEW_RESOURCE_FAILURE:
      return {
        ...state,
        addErorr: true,
      };

    case UPDATE_RESOURCE_SUCCESS:
      const resourceCopy = [...state.resources];
      const foundIndex = resourceCopy.findIndex(
        (elem) => elem._id === action.data._id
      );
      resourceCopy[foundIndex] = action.data;
      return {
        ...state,
        resources: resourceCopy,
        updateError: false,
      };

    case UPDATE_RESOURCE_FAILURE:
      return {
        ...state,
        updateError: true,
      };

    case DELETE_RESOURCE_SUCCESS:
      const resourceDelete = state.resources.filter(
        (elem) => elem._id !== action.data._id
        );
      return {
        ...state,
        resources: resourceDelete,
        deleteError: false,
      };

    case DELETE_RESOURCE_FAILURE:
      return {
        ...state,
        deleteError: true,
      };

    default:
      return state;
  }
};

export default resourceReducer;
