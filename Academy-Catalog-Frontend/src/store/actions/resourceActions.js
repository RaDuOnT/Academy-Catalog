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
import resourcesService from "../services/resourceRequests";

// This is function that validates the get method
function findResourcesSuccess(resourceList) {
  return {
    type: FIND_RESOURCES_SUCCESS,
    data: resourceList,
  }; 
}

function findResourcesFailure(resourceList) {
  return {
    type: FIND_RESOURCES_FAILURE,
    listerror: true,
  }; 
}

// This is the get action
export const findAllResources = () => (dispatch, getState) => {
  return resourcesService
    .find()
    .then((json) => {
      dispatch(findResourcesSuccess(json.data));
    })
    .catch((err) => {
      dispatch(findResourcesFailure(err));
    });
};

// This is the function that validates the post method
function addResourceSucces(resource) {
  return {
    type: ADD_NEW_RESOURCE_SUCCESS,
    data: resource,
  };
}

function addResourceFailure(resource) {
  return {
    type: ADD_NEW_RESOURCE_FAILURE,
    data: resource,
  };
}

// This is the post action
export const createResource = (resource) => (dispatch, getState) => {
  return resourcesService
    .create(resource)
    .then((json) => {
      dispatch(addResourceSucces(json));
    })
    .catch((err) => {
      dispatch(addResourceFailure(err));
    });
}

//This is the function that validates the patch method
function updateResourceSucces(resource) {
  return {
    type: UPDATE_RESOURCE_SUCCESS,
    data: resource,
  };
}

function updateResourceFailure(resource) {
  return {
    type: UPDATE_RESOURCE_FAILURE,
    data: resource,
  };
}

// This is the update action
export const patchResources = (resource) => (dispatch, getState) => {
  return resourcesService 
    .update(resource._id, resource)
    .then((json) => {
      dispatch(updateResourceSucces(json));
    })
    .catch((err) => {
      dispatch(updateResourceFailure(err));
    });
}

//This is the function that validates the delete method
function deleteResourceSucces(resource) {
  return {
    type: DELETE_RESOURCE_SUCCESS,
    data: resource,
  };
}

function deleteResourceFailure(resource) {
  return {
    type: DELETE_RESOURCE_FAILURE,
    data: resource,
  };
}

// This is the delete action
export const deleteResources = (resource) => (dispatch, getState) => {
  return resourcesService
    .remove(resource)
    .then((json) => {
      dispatch(deleteResourceSucces(json));
    })
    .catch((err) => {
      dispatch(deleteResourceFailure(err));
    });
}