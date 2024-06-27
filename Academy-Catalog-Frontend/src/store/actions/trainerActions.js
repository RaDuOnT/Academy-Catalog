import {     //All the imports needed and its routes
    FIND_TRAINERS_SUCCESS,
    FIND_TRAINERS_FAILURE,
    ADD_NEW_TRAINER_SUCCESS,
    ADD_NEW_TRAINER_FAILURE,
    EDIT_NEW_TRAINER_SUCCESS,
    EDIT_NEW_TRAINER_FAILURE,
    DELETE_TRAINER_SUCCESS,
    DELETE_TRAINER_FAILURE,     
 } from "../actionTypes/trainerActionTypes";
import { coursesEndpoint } from "../environment";
import trainerServices from "../services/trainerRequest";




//Read with both cases of failure and success
function findTrainersSuccess(trainerList){
    return{
        type:FIND_TRAINERS_SUCCESS,
        data: trainerList,
    };
}
function findTrainersFailure(err){
    return{
        type:FIND_TRAINERS_FAILURE,
        findAllError: true,
        errorMessage: err.errorMessage,
    };
}




// Function used for POST Method with both cases of failure and success
 export function addNewTrainerSucces(trainer){
    return {
        type: ADD_NEW_TRAINER_SUCCESS,
        data: trainer,
    };
}

  export function addNewTrainerFailure(err){
    return{
      type:ADD_NEW_TRAINER_FAILURE,
      addError:true,
      errorMessage: err.message,
    }
  }



// Function for Fatch Method with both cases of failure and success
export function editTrainerSuccess(newTrainer) {
    return {
      type: EDIT_NEW_TRAINER_SUCCESS,
      data: newTrainer,
    };
  }
  
  export function editTrainerFailure(err) {
    return {
      type: EDIT_NEW_TRAINER_FAILURE,
      editError: true,
      errorMessage: err.message,
    };
  }




//  Function for DELETE Method with both cases of failure and success
  export function deleteTrainerSuccess(deletedTrainer) {
    return {
      type: DELETE_TRAINER_SUCCESS,
      data: deletedTrainer,
    };
  }
  
  export function deleteTrainerFailure(err) {
    return {
      type: DELETE_TRAINER_FAILURE,
      deleteError: true,
      errorMessage: err.message,
    };
  }
  
  



// Dispatch used for GET method
export const findAllTrainers =() =>( dispatch, getState) =>{

    return trainerServices
    .find()
    .then((json)=>{
       
        dispatch(findTrainersSuccess(json.data));
    })
    .catch((err) => {
        dispatch(findTrainersFailure(err));
    });
}


// Defining patch method to post new data
export const createTrainer = (trainer) => (dispatch, getState) =>{
    return trainerServices
    .create(trainer)
    .then((json) => {
     
        dispatch(addNewTrainerSucces(json));
    })
    .catch((err) => {
      dispatch(addNewTrainerFailure(err));
        
    });

}

// Dispatch used for EDIT method
export const editTrainer = (trainer) => (dispatch, getState) => {
    return trainerServices
      .updateWithPatch(trainer._id, trainer)
      .then((json) => {
        dispatch(editTrainerSuccess(json));
      })
      .catch((err) => {
        dispatch(editTrainerFailure(err));
      });
  };




  // Dispatch used for DELETE method
  export const deleteTrainer = (trainerID) => (dispatch, getState) => {
    return trainerServices
      .remove(trainerID)
      .then((json) => {
        dispatch(deleteTrainerSuccess(json));
      })
      .catch((err) => {
        dispatch(deleteTrainerFailure(err));
      });
  };
  
  